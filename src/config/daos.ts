
import { PagamentoDao } from "../database/dao/pagamentoDao";

export class Daos {
    private _pagamentoDao: PagamentoDao;


    constructor(connection: any) {
        this._pagamentoDao = new PagamentoDao(connection);
    }
}