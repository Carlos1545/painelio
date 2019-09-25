class UsuarioDao {
    constructor(connection) {
        this._connection = connection;
    }
    
    list() {
        return new Promise((req, res) => 
            this._connection.query('SELECT * FROM products', (err, products) => {
                if(err) return reject(err);
                resolve(products);
            })
        );
    }
    // outros métodos de persistência
}