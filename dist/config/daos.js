"use strict";
const pagamentoDao_1 = require("../database/dao/pagamentoDao");
class Daos {
    constructor(connection) {
        this._pagamentoDao = new pagamentoDao_1.PagamentoDao(connection);
    }
}
exports.Daos = Daos;
