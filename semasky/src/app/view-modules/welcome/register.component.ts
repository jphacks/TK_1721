import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(
    private _register: RegisterService,
    private _router: Router
  ) {
  }

  submit(event) {
    event.preventDefault();
    let self = this;
    self._register.register({
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
