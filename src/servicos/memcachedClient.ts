import * as memcached from 'memcached';

export class MemcachedClient {
  private _client: typeof memcached;

  constructor() {
    console.log(typeof memcached);


    this._client = new memcached('localhost:11211', {
      retries: 10,
      retry: 10000,
      remove: true,
    });
  }


  set(pagamento: JSON) {

    this._client.set('pagamento-' + pagamento[0].id, pagamento[0], 60000, (erro) => {

    });

  }

  get(id: number) {
    return new Promise((resolve, reject) => {
      this._client.get('pagamento-' + id, (erro, retorno) => {
        if (erro || !retorno) {

          reject(new Error('not found'));
        } else {

          resolve(retorno);
        }
      });
    });
  }



}