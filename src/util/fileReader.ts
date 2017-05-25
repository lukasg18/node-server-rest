import * as fs from 'fs';

export class FileOperator {
  public fs: typeof fs;

  constructor() {
    this.fs = fs;
  }


  public read() {
    this.fs.readFile('yoda.jpg', (error, buffer) => {
      if (error)
        console.log(error);
      else
        console.log('arquivo lido');
      this.fs.writeFile('saida.jpg', buffer, (error) => {
        if (error)
          console.log(error);
        else
          console.log('arquivo escrito');
      });
    });
  }

  public readStream() {
    this._fs.createReadStream('yoda.jpg').pipe(fs.createWriteStream('yoda-stream.jpg').on('finish', () => {
      console.log('arquivo escrito com stream');
    }));
  }






}