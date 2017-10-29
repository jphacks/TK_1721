import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private _login: LoginService,
    private _router: Router
  ) {
  }

  submit(event) {
    event.preventDefault();
    event.stopPropagation();
    let self = this;
    self._login.login({
      email: event.target[0].value,
      password: event.target[1].value
    }, self.success.bind(self), self.error.bind(self));
  }

  success(user) {
    let self = this;
    self._router.navigate(["/search"]);
  }

  error() {
  }
}
