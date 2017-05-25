import { CustomExpress } from "../config/custom-express";
import { PagamentoDao } from "../database/dao/pagamentoDao";
import { Pagamentos } from "../routes/pagamentos";
import { ConnectionFactory } from "../database/connection/connectionFactory";


export class Routes {
    private _pagamentos: Pagamentos;
    private _connectionfactory: ConnectionFactory;
    private _pagamentodao: PagamentoDao;

    constructor(customexpress: CustomExpress, SocketIO: any) {
        this._connectionfactory = new ConnectionFactory();
        this._pagamentodao = new PagamentoDao(this._connectionfactory.createDBConnection());
        this._pagamentos = new Pagamentos(customexpress, this._pagamentodao, SocketIO);
    }
}