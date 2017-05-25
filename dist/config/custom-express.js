"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var expressValidator = require('express-validator');
class CustomExpress {
    constructor() {
        this._express = express();
        this.middlewareExpress();
    }
    // Configure Express middleware.
    middlewareExpress() {
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
