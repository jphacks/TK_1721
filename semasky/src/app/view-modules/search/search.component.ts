import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../entities';
import { UserService, UserStoreService } from '../../services/users';

@Component({
  selector: 'search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  constructor(
    private _user: UserService,
    private _store: UserStoreService,
    private _router: Router
  ) {
    let self = this;
    _user.ping(self.success.bind(self), self.error.bind(self));
  }

  success(params) {
    let self = this;
    if (!!params.id) {
      self._store.bind(new User(params));
    } else {
      self._router.navigate(["/"]);
    }
  }

  error(e) {
    console.error(e);
  }
}
