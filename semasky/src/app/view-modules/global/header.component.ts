import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users';

@Component({
  selector: 'semasky-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  @Input() type: string;

  constructor(
    private _user: UserService,
    private _router: Router
  ) {
  }

  logout(event) {
    event.preventDefault();
    let self = this;
    self._user.logout(self.success.bind(self), self.error.bind(self));
  }

  success() {
    let self = this;
    self._router.navigate(["/"]);
  }

  error(e) {
    console.error(e);
  }
}
