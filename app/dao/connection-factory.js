const dbconfig  = require('../config/database');
var mysql       = require('mysql');

module.exports = function() {
    let connection = mysql.createConnection(dbconfig.connection);

    return connection;
};