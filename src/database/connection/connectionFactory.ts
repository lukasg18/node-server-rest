import * as mysql from 'mysql';


export class ConnectionFactory {

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