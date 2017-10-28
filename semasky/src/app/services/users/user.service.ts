import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../base';
import { User } from '../../entities';
import { UserStoreService } from './user-store.service';
import { RequestType } from '../../maps';

@Injectable()
export class UserService {
  constructor(
    private _api: ApiService,
    private _store: UserStoreService
  ) {
  }

  logout(success: Function, error: Function): Subscription {
    let self = this;
    let url: string = `api/logout`;
    return self._api.request(RequestType.GET, url, null, success, error);
  }

  ping(success: Function, error: Function): Subscription {
    let self = this;
    let url: string = `api/ping`;
    return self._api.request(RequestType.GET, url, null, success, error);
  }
}
