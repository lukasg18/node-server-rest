import * as mysql from 'mysql';

export class PagamentoDao {
    private _connection: any;

    constructor(connection: any) {
        this._connection = connection;

    }


    salva(pagamentos, callback) {
        this._connection.query('INSERT INTO pagamentos set ?', pagamentos, callback);
    }
    buscaPorId(id, callback) {
        this._connection.query("select * from pagamentos where id = ?", [id], callback);
    }

}