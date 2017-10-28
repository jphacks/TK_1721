import { environment } from '../environments/environment';

export namespace config.env {
  export const development: boolean = !environment.production;
  export const production: boolean = environment.production;
}

export namespace config.http {
  let host: string;
  if (environment.production) {

  } else {
    host = 'http://localhost:9292/';
  }
  export const HOST: string = host;
}
