import * as express from 'express'
import { CustomExpress } from "./config/custom-express";
import { Routes } from "./config/routes";


// Creates and configures an ExpressJS web server.
export class App {
  public express: express.Application;
  private _customexpress: CustomExpress;
  private _routes: Routes;


  constructor() {
    this._customexpress = new CustomExpress();
    this.express = this._customexpress.Express();
    this._routes = new Routes(this._customexpress);

  }
}

export default new App().express;