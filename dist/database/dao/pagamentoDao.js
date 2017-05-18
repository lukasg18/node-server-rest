"use strict";
class PagamentoDao {
    constructor(connection) {
        this._connection = connection;
    }
    salva(pagamentos, callback) {
        this._connection.query('INSERT INTO pagamentos set ?', pagamentos, callback);
    }
    buscaPorId(id, callback) {
        this._connection.query("select * from pagamentos where id = ?", [id], callback);
    }
}
exports.PagamentoDao = PagamentoDao;
