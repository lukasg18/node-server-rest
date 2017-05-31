import * as winston from 'winston';

export class Logger {


  private _logger: winston.LoggerInstance;


  constructor() {
    this._logger = new winston.Logger({
      transports: [
        new winston.transports.File({
          level: "info",
          filename: 'src/logs/payfast.log',
          maxsize: 100000000,
          maxFiles: 10
        })
      ]
    });
  }


  writeLog(log: string) {

    this._logger.log('info', log);
  }


}