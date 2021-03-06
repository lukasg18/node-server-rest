"use strict";
const pagamentoDao_1 = require("../database/dao/pagamentoDao");
const pagamentos_1 = require("../routes/pagamentos");
const connectionFactory_1 = require("../database/connection/connectionFactory");
const memcachedClient_1 = require("../servicos/memcachedClient");
class Routes {
    constructor(customexpress, SocketIO) {
        this._memcachedclient = new memcachedClient_1.MemcachedClient();
        this._connectionfactory = new connectionFactory_1.ConnectionFactory();
        this._pagamentodao = new pagamentoDao_1.PagamentoDao(this._connectionfactory.createDBConnection());
        this._pagamentos = new pagamentos_1.Pagamentos(customexpress, this._pagamentodao, SocketIO, this._memcachedclient);
    }
}
exports.Routes = Routes;
