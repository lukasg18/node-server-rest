"use strict";
const express = require('express');
class Pagamentos {
    constructor(customexpress, pagamentodao) {
        this._express = customexpress.Express();
        this._router = express.Router();
        this._pagamentodao = pagamentodao;
        this.routes();
    }
    routes() {
        // placeholder route handler
        this._router.get('/pagamentos', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this._router.post('/pagamentos/pagamento', (req, res, next) => {
            let pagamento = req.body;
            this._pagamentodao.salva(pagamento, (erro, resultado) => {
                res.json('resultado ' + resultado);
            });
        });
        this._express.use('/', this._router);
    }
}
exports.Pagamentos = Pagamentos;
