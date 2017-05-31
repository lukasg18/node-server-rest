import * as express from 'express'
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { Logger } from "../servicos/logger";

var expressValidator = require('express-validator');


export class CustomExpress {
    private _express: express.Application;
    private _log: Logger;
    private _validator: any;


    constructor() {
        this._express = express();
        this.middlewareExpress();
        this._log = new Logger();
    }
    // Configure Express middleware.
    private middlewareExpress(): void {
        this._express.use(morgan("common", {
            stream: {
                write: (mensagem) => {
                        this._log.writeLog(mensagem)
                }
            }
        }));
        this._express.use(logger('dev'));
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(expressValidator());
    }

    public Express() {
        return this._express;
    }

}