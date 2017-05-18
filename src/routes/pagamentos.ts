import * as express from 'express'
import { PagamentoDao } from "../database/dao/pagamentoDao";
import { CustomExpress } from "../config/custom-express";


export class Pagamentos {
    private _router: express.Router;
    private _express: express.Application;
    private _pagamentodao: PagamentoDao;

    constructor(customexpress: CustomExpress, pagamentodao: PagamentoDao) {
        this._express = customexpress.Express();
        this._router = express.Router();
        this._pagamentodao = pagamentodao;
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
            this._pagamentodao.salva(pagamento, (erro, resultado) => {
                res.json('resultado ' + resultado);
            });

        });

        this._express.use('/', this._router);





    }

}

