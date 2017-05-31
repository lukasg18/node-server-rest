"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger_1 = require("../servicos/logger");
var expressValidator = require('express-validator');
class CustomExpress {
    constructor() {
        this._express = express();
        this.middlewareExpress();
        this._log = new logger_1.Logger();
    }
    // Configure Express middleware.
    middlewareExpress() {
        this._express.use(morgan("common", {
            stream: {
                write: (mensagem) => {
                    this._log.writeLog(mensagem);
                }
            }
        }));
        this._express.use(logger('dev'));
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(expressValidator());
    }
    Express() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
