"use strict";
const pagamentoDao_1 = require("../database/dao/pagamentoDao");
const pagamentos_1 = require("../routes/pagamentos");
const connectionFactory_1 = require("../database/connection/connectionFactory");
class Routes {
    constructor(customexpress, SocketIO) {
        this._connectionfactory = new connectionFactory_1.ConnectionFactory();
        this._pagamentodao = new pagamentoDao_1.PagamentoDao(this._connectionfactory.createDBConnection());
        this._pagamentos = new pagamentos_1.Pagamentos(customexpress, this._pagamentodao, SocketIO);
    }
}
exports.Routes = Routes;
