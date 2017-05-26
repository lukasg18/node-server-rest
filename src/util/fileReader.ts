import * as fs from 'fs';

export class FileOperator {
  public fs: typeof fs;

  constructor() {
    this.fs = fs;
  }


  public read() {
    this.fs.readFile('yoda.jpg', (error, buffer) => {
      if (error) { }
      else
        this.fs.writeFile('saida.jpg', buffer, (error) => {
          if (error) { }
          else { }
        });
    });
  }

  public readStream() {
    this.fs.createReadStream('yoda.jpg').pipe(fs.createWriteStream('yoda-stream.jpg').on('finish', () => {
    }));
  }
}