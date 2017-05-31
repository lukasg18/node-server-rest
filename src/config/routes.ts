import { CustomExpress } from "../config/custom-express";
import { PagamentoDao } from "../database/dao/pagamentoDao";
import { Pagamentos } from "../routes/pagamentos";
import { ConnectionFactory } from "../database/connection/connectionFactory";
import { MemcachedClient } from "../servicos/memcachedClient";
import { Logger } from "../servicos/logger";


export class Routes {
    private _memcachedclient: MemcachedClient;
    private _pagamentos: Pagamentos;
    private _connectionfactory: ConnectionFactory;
    private _pagamentodao: PagamentoDao;

    constructor(customexpress: CustomExpress, SocketIO: any) {
        this._memcachedclient = new MemcachedClient();

        this._connectionfactory = new ConnectionFactory();
        this._pagamentodao = new PagamentoDao(this._connectionfactory.createDBConnection());
        this._pagamentos = new Pagamentos(customexpress, this._pagamentodao,
            SocketIO, this._memcachedclient);
    }
}