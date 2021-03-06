"use strict";
const custom_express_1 = require("./config/custom-express");
const routes_1 = require("./config/routes");
// Creates and configures an ExpressJS web server.
class App {
    constructor() {
        this.start = () => {
            this._routes = new routes_1.Routes(this._customexpress, this._SockeIO);
        };
        this._customexpress = new custom_express_1.CustomExpress();
        this.express = this._customexpress.Express();
    }
}
exports.App = App;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App();
