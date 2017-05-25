"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const consign = require('consign');
var expressValidator = require('express-validator');
class CustomExpress {
    constructor() {
        this._express = express();
        this._consign = consign();
        this.middlewareExpress();
        this.middlewareConsign();
    }
    // Configure Express middleware.
    middlewareExpress() {
        this._express.use(logger('dev'));
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(expressValidator());
    }
    middlewareConsign() {
        this._consign.include('src/routes').then('src/database').into(this._express);
    }
    Express() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
