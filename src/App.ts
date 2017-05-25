import * as express from 'express'
import { CustomExpress } from "./config/custom-express";
import { Routes } from "./config/routes";
import * as http from 'http';
import * as socketIo from 'socket.io';


// Creates and configures an ExpressJS web server.
export class App {
  public express: express.Application;
  private _customexpress: CustomExpress;
  private _routes: Routes;
  public _SockeIO: any;

  constructor() {
    this._customexpress = new CustomExpress();
    this.express = this._customexpress.Express();
  }


  start = () => {
    this._routes = new Routes(this._customexpress, this._SockeIO);
  }
}

export default new App();