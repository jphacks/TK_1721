import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users';

@Component({
  selector: 'catch',
  templateUrl: './catch.component.html'
})
export class CatchComponent {
  constructor(
    private _user: UserService,
    private _router: Router
  ) {
  }

  demo(event) {
    event.preventDefault();
    let self = this;
    self._user.demo(self.success.bind(self), self.error.bind(self));
  }

  success() {
    let self = this;
    self._router.navigate(["/search"]);
  }

  error(e) {
    console.error(e);
  }
}
