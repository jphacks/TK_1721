import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../base';
import { UserStoreService } from '../users';
import { RequestType } from '../../maps';

@Injectable()
export class FileService {
  constructor(
    private _api: ApiService,
    private _store: UserStoreService
  ) {
  }

  submit(data: any, success: Function, error: Function): Subscription {
    let self = this;
    let url: string = `upload`;
    let params = {
      data: data
    };

    console.log(data);
    return self._api.request(RequestType.POST, url, params, success, error);
  }
}
