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
    
    entity.findOne = function(entity2, callback){
        let entityEncontrado;

        try{
            for(let i = 0; i < this.dados.length; i++){
                let hasOne = Object.keys(entity2).every(k1 =>{
                    Object.keys(this.dados[i]).some(k2 => {
                        entity2[k1] === this.dados[i][k2];
                    })
                });
                if(hasOne)
                    entityEncontrado = this.dados[i];
            }
        }catch(err){
            this.erro = err;
            console.error(err);
        }
        callback(this.erro, entityEncontrado);
    }
    entity.insertOne = function(newData, callbackFunction){
        let sql = `INSERT INTO ${tableName} (${entity.campos[1]}, ${entity.campos[2]}, ${entity.campos[6]}, ${entity.campos[7]}) VALUES (?, ?, ?, ?)`;
        
        connection.query(sql, [newData.name, newData.email, newData.login, newData.pass], function(error, entityInserido){
            if(error){
                throw error;
            }else{
                callbackFunction(erro, entityInserido);
            }
        });
    }
    entity.findOneAndUpdate = function(objectToFind, keysToUpdate, otherObject, callcallbackFunctionback){

    }
    entity.find = function(){

    }
    entity.deleteOne = function(){

    }
    entity.deleteMany = function({}, callbackFunction){

    }
    entity.indexes = function(teste, callbackFunction){
        callbackFunction(e, indexes);
    }

    callback(erro, entity);
}
module.exports = genericDao;