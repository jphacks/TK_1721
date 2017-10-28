import { Component } from '@angular/core';
import { RegisterService } from '../../services/register';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(
    private _register: RegisterService
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
    console.log(user);
  }

  error() {
  }
}
