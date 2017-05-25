"use strict";
class PagamentoDao {
    constructor(connection) {
        this._connection = connection;
    }
    salva(pagamentos, callback) {
        this._connection.query('INSERT INTO pagamentos set ?', pagamentos, callback);
    }
    atualiza(pagamentos, callback) {
        this._connection.query('UPDATE pagamentos set status  = ?  WHERE id = ?', [pagamentos.status, pagamentos.id], callback);
    }
    buscaPorId(id, callback) {
        this._connection.query("select * from pagamentos where id = ?", [id], callback);
    }
    lista(callback) {
        this._connection.query('select * from pagamentos', callback);
    }
}
exports.PagamentoDao = PagamentoDao;
