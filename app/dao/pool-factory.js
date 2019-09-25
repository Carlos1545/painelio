const dbconfig  = require('../config/database');
var mysql       = require('mysql');

const pool = mysql.createPool(dbconfig.connection);

pool.on('connection', () => console.log('mysql :: Pool criado'));

pool.on('release', () => console.log('mysql :: Pool fechado'));

module.exports = pool;