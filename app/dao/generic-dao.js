const pool = require('./pool-factory');

function genericDao(tableName){
    let _entity = {};

// CONEXÃO INICIAL COM O BANCO DE DADOS PARA INSERIR NA ENTIDADE, O NOME, OS DADOS E OS CAMPOS
    pool.getConnection(function(err, connection){
        if(err) throw err;

        connection.query(`SELECT * FROM ${tableName}`, function (error, tabela, fields) {
            if(error) throw error;

            connection.release();
            
            _entity.nome = tableName;
            _entity.dados = tabela;
            _entity.campos = fields.map(element => element.name);
        });
    });
    
    _entity.findOne = function(entityToFind, callback){
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
    _entity.insertOne = function(newData, callbackFunction){
        pool.getConnection(function(err, connection){
            if(err) throw err;
            
            let sql2 = `INSERT INTO ${tableName} (${Object.keys(newData).map(current => current)}) VALUES (${Object.values(newData).map( () => '?')})`;
            connection.query(sql2, Object.values(newData), function(error, entityInserido){
                if(error) throw error;

                connection.release();
                
                callbackFunction(erro, entityInserido);
            });
        });
    }
    _entity.findOneAndUpdate = function(entityToFind, keysToUpdate, otherObject, callbackFunction){
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
    _entity.updateOne = function(entityToUpdate, fieldsEntityToUpdate, callbackFunction){
        pool.getConnection(function(err, connection){
            if(err) throw err;
            let sql = `UPDATE ${tableName} SET ${Object.keys(fieldsEntityToUpdate).map((c, i) => c + ' = ?')} WHERE id = ${entityToUpdate.id}`;
            connection.query(sql, Object.values(fieldsEntityToUpdate), function(error, entityInserido){
                if(error) throw error;

                connection.release();
                
                callbackFunction(erro, entityInserido);
            });
        });
    }
    _entity.find = function(){
        console.log("find");
    }
    _entity.deleteOne = function(){
        console.log("deleteOne");
    }
    _entity.deleteMany = function({}, callbackFunction){
        console.log("deleteMany");
    }
    _entity.indexes = function(teste, callbackFunction){
        console.log("indexes");
        callbackFunction(e, indexes);
    }

    return _entity;
}
module.exports = genericDao;