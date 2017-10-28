import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../base';
import { User } from '../../entities';
import { UserStoreService } from '../users';
import { RequestType } from '../../maps';

@Injectable()
export class LoginService {
  constructor(
    private _api: ApiService,
    private _store: UserStoreService
  ) {
  }

  login(user: User, success: Function, error: Function): Subscription {
    let self = this;
    let url: string = `api/login`;
    let params = {
      user: user
    };
    let block = (json: JSON) => {
      let user: User = new User(json);
      if (!!user) {
        self._store.bind(user);
        success(user);
      }
    };
    return self._api.request(RequestType.POST, url, params, block, error);
  }
}
