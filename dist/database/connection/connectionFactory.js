"use strict";
const mysql = require('mysql');
class ConnectionFactory {
    constructor() {
    }
    createDBConnection() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'payfast'
        });
    }
}
exports.ConnectionFactory = ConnectionFactory;
