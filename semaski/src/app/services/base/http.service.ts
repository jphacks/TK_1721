import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RequestType } from '../../maps';
import { config } from '../../config';
import { Logger } from '../../helpers';

export abstract class HttpService {

  protected _prefix: string;
  private _requestOptions: RequestOptions;

  constructor(
    protected _http: Http
  ) {
    let self = this;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    self._requestOptions = new RequestOptions({
      headers: headers,
      withCredentials: true
    });
  }

  request(type: RequestType, url: string, params: {[key: string]: any}, success: Function, error: Function, ensure?: Function): Subscription {
    url = this._prefix + url + '.json';

    // add agent param of Web
    if (params) {
      params['agent'] = 0;
    } else {
      params = {
        agent: 0
      }
    }

    let response: Observable<Response>;

    switch (type) {
      case RequestType.GET:
        response = this.get(url, params);
        break;
      case RequestType.POST:
        response = this.post(url, params);
        break;
      case RequestType.PATCH:
        response = this.patch(url, params);
        break;
      case RequestType.PUT:
        response = this.put(url, params);
        break;
      case RequestType.DELETE:
        response = this.delete(url);
        break;
    }

    return response.subscribe(
      res => {
        let status: number = res.status;

        if (status - 200 < 100) {
          success(res.json());
        } else {
          error(res.json());
        }
      },
      err => {
        error(err);
      },
      () => {
        if (!!ensure) {
          ensure();
        }
      }
    )
  }

  downloadCsv(type: RequestType, url: string, params: {[key: string]: any}, success?: Function, error?: Function): void {
    let self = this;
    url = self._prefix + url + '.json';

    let response: Observable<Response>;
    switch (type) {
      case RequestType.GET:
        response = self._http.get(url);
        break;
      case RequestType.POST:
        response = self._http.post(url, JSON.stringify(params));
        break;
      default:
        return;
    }

    response.subscribe(
      data => {
        let blob = new Blob([data.text()], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);
        window.open(url);

        if (!!success) {
          success(data);
        }
      },
      err => {
        if (!!error) {
          error(err);
        }
      }
    );
  }

  protected get(url: string, params: {[key: string]: any}): Observable<Response> {

    if (params) {
      url += '?';
      for (let _key in params) {
        url += `${_key}=${params[_key]}&`;
      }
    }
    return this._http.get(url, this._requestOptions);
  }

  protected post(url: string, params: {[key: string]: any}): Observable<Response> {
    return this._http.post(url, JSON.stringify(params), this._requestOptions);
  }

  protected patch(url: string, params: {[key: string]: any}): Observable<Response> {
    return this._http.patch(url, JSON.stringify(params), this._requestOptions);
  }

  protected put(url: string, params: {[key: string]: any}): Observable<Response> {
    return this._http.put(url, JSON.stringify(params), this._requestOptions);
  }

  protected delete(url: string): Observable<Response> {
    return this._http.delete(url, this._requestOptions);
  }

}
