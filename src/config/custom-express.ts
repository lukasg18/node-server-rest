import * as express from 'express'
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as consign from 'consign';

var expressValidator = require('express-validator');


export class CustomExpress {
    private _express: express.Application;
    private _consign: consign;
    private _validator: any;


    constructor() {
        this._express = express();
        this._consign = consign();
        this.middlewareExpress();
        this.middlewareConsign();
    }
    // Configure Express middleware.
    private middlewareExpress(): void {
        this._express.use(logger('dev'));
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(expressValidator());
    }

    private middlewareConsign(): void {
        this._consign.include('src/routes').then('src/database').into(this._express);
    }


    public Express() {
        return this._express;
    }

}