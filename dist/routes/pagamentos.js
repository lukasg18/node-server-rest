"use strict";
const express = require('express');
const fileReader_1 = require("../util/fileReader");
class Pagamentos {
    constructor(customexpress, pagamentodao, SocketIO) {
        this._express = customexpress.Express();
        this._router = express.Router();
        this._pagamentodao = pagamentodao;
        this._socketIO = SocketIO;
        this._fileOperator = new fileReader_1.FileOperator();
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
            console.log('pagamento: ' + pagamento);
            pagamento.status = 'Criado';
            pagamento.data = new Date();
            req.assert("forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
            req.assert("valor", "Valor é obrigatório e deve ser um decimal.").notEmpty().isFloat();
            req.assert("moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3, 3);
            var errors = req.validationErrors();
            if (errors) {
                console.log(pagamento);
                console.log("Erros de validação encontrados");
                res.status(400).send(errors);
                return;
            }
            this._pagamentodao.salva(pagamento, (erro, resultado) => {
                if (erro) {
                    res.json('erro :' + erro);
                }
                else {
                    pagamento.id = resultado.insertId;
                    let response = {
                        dados_do_pagamento: pagamento,
                        links: [
                            {
                                href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.insertId,
                                rel: 'confirmar',
                                method: 'PUT'
                            }, {
                                href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.insertId,
                                rel: 'cancelar',
                                method: 'DELETE'
                            }
                        ],
                    };
                    res.status(201).json(response);
                }
            });
        });
        this._router.put('/pagamentos/pagamento/:id', (req, res, net) => {
            let pagamento = [];
            pagamento.status = 'CONFIRMADO';
            pagamento.id = req.params.id;
            this._pagamentodao.atualiza(pagamento, (erro) => {
                if (erro) {
                    res.status(500).send(erro);
                    return;
                }
                res.send(pagamento);
            });
        });
        this._router.delete('/pagamentos/pagamento/:id', (req, res, net) => {
            let pagamento = [];
            pagamento.status = 'Cancelado';
            pagamento.id = req.params.id;
            this._pagamentodao.atualiza(pagamento, (erro) => {
                if (erro) {
                    res.status(500).send(erro);
                    return;
                }
                res.send(pagamento);
            });
        });
        this._router.post('/pagamentos/upload', (req, res, next) => {
            let filename = req.headers.filename;
            req.pipe(this._fileOperator.fs.createWriteStream(filename)).on('finish', () => {
                res.status(201).send('OK');
            });
        });
        let self = this;
        this._socketIO.on('connection', function (socket) {
            console.log('a user connected');
            socket.on('chat message', function (msg) {
                self._socketIO.emit('chat message', msg);
                console.log(msg);
            });
        });
        this._express.use('/', this._router);
    }
}
exports.Pagamentos = Pagamentos;
