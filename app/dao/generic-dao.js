const dbconfig  = require('../config/database');
const connectionFactory = require('./connection-factory');
const connection = connectionFactory();

function genericDao(tableName, callback){
    let erro, entity = {};
    
// CONEXÃO INICIAL COM O BANCO DE DADOS PARA INSERIR NA ENTIDADE, O NOME, OS DADOS E OS CAMPOS
    connection.query(`SELECT * FROM ${tableName}`, function (error, tabela, fields) {
        if (error){
            console.error('error ao conectar: ' + error.stack);
            throw error;
        }else{
            console.log(`mysql :: conectado ao banco :: ${dbconfig.connection.database} :: tabela ${tableName}`);
        }
        entity.nome = tableName;
        entity.dados = tabela;
        entity.campos = fields.map(element => element.name);

        callback(erro, entity);
    });
    
    entity.findOne = function(entityToFind, callback){
        let entityEncontrado;

        try{
            for(let i = 0; i < this.dados.length; i++){
                let hasOne = Object.entries(entityToFind).every( k1 => {
                    return Object.entries(this.dados[i]).some(k2 => 
                        JSON.stringify(k1) === JSON.stringify(k2));
                });
                if(hasOne)
                    entityEncontrado = this.dados[i];
            }
        }catch(err){
            this.erro = err;
            console.error(err);
        }
        callback(this.erro, entityEncontrado, this);
    }
    entity.insertOne = function(newData, callbackFunction){
        let sql2 = `INSERT INTO ${tableName} (${Object.keys(newData).map(current => current)}) VALUES (${Object.values(newData).map( () => '?')})`;
        connection.query(sql2, Object.values(newData), function(error, entityInserido){
            if(error){
                throw error;
            }else{
                callbackFunction(erro, entityInserido);
            }
        });
    }
    entity.findOneAndUpdate = function(entityToFind, keysToUpdate, otherObject, callbackFunction){
        this.findOne(entityToFind, function(e, o, all){
            if (o == null){
                callbackFunction('user-not-found');
            }else{
                all.updateOne(o, keysToUpdate, function(error, entityInserido){
                    if(error){
                        callbackFunction(error, null);
                    }else{
                        callbackFunction(error, entityInserido);
                    }
                });
            }
        });
    }
    entity.updateOne = function(entityToUpdate, fieldsEntityToUpdate, callbackFunction){
        let sql = `UPDATE ${tableName} SET ${Object.keys(fieldsEntityToUpdate).map((c, i) => c + ' = ?')} WHERE id = ${entityToUpdate.id}`;
        connection.query(sql, Object.values(fieldsEntityToUpdate), function(error, entityInserido){
            if(error){
                callbackFunction(error, null);
            }else{
                callbackFunction(null, entityInserido)
            }
        })
    }
    entity.find = function(){
        console.log("find");
    }
    entity.deleteOne = function(){
        console.log("deleteOne");
    }
    entity.deleteMany = function({}, callbackFunction){
        console.log("deleteMany");
    }
    entity.indexes = function(teste, callbackFunction){
        console.log("indexes");
        callbackFunction(e, indexes);
    }

    callback(erro, entity);
} 
module.exports = genericDao;