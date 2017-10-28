import { Component } from '@angular/core';
import { LoginService } from '../../services/login';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private _login: LoginService
  ) {
  }

  submit(event) {
    event.preventDefault();
    let self = this;
    self._login.login({
      email: event.target[0].value,
      password: event.target[1].value
    }, self.success.bind(self), self.error.bind(self));
  }

  success(user) {
    console.log(user);
  }

  error() {
  }
}
