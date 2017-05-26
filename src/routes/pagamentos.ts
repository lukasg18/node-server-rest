import * as express from 'express'
import { PagamentoDao } from "../database/dao/pagamentoDao";
import { CustomExpress } from "../config/custom-express";
import { FileOperator } from "../util/fileReader";
import { MemcachedClient } from "../servicos/memcachedClient";

export class Pagamentos {
  private _router: express.Router;
  private _express: express.Application;
  private _pagamentodao: PagamentoDao;
  private _socketIO: SocketIO.Server;
  private _fileOperator: FileOperator;
  private _memcachedclient: MemcachedClient;

  constructor(customexpress: CustomExpress, pagamentodao: PagamentoDao,
    SocketIO: any, memcached: MemcachedClient) {
    this._express = customexpress.Express();
    this._router = express.Router();
    this._pagamentodao = pagamentodao;
    this._socketIO = SocketIO;
    this._fileOperator = new FileOperator();
    this._memcachedclient = memcached;
    this.routes();
  }
  private routes(): void {
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
          this._memcachedclient.set(pagamento);
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
          }
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

    this._router.get('/pagamentos/pagamentos/:id', (req, res, net) => {


      let id = req.params.id;

      this._memcachedclient.get(id).then((response) => {
      
        res.json({ response });
      }).catch((erro) => {
        this._pagamentodao.buscaPorId(id, (erro, resultado) => {
          if (erro) {
            res.status(500).send(erro);
            return;
          }
          else {
            this._memcachedclient.set(resultado);
            res.json(resultado);
          }
        });
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

