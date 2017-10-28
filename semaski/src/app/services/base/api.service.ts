import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { config } from '../../config';
import { Logger } from '../../helpers';

@Injectable()
export class ApiService extends HttpService {
  constructor(
    protected _http: Http
  ) {
    super(_http);
    this._prefix = config.http.API;
  }
}
