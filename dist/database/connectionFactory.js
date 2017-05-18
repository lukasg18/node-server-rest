"use strict";
const mysql = require('mysql');
class ConnectionFactory {
    constructor() {
    }
    createDBConnection() {
        return mysql.createDBConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'payfast'
        });
    }
}
exports.ConnectionFactory = ConnectionFactory;
