import { environment } from '../environments/environment';

export namespace config.env {
  export const development: boolean = !environment.production;
  export const production: boolean = environment.production;
}

export namespace config.http {
  let api: string;
  if (environment.production) {

  } else {
    api = 'http://localhost:9292/api/';
  }
  export const API: string = api;
}
