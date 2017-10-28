import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  constructor(
    private _router: Router
  ) {
    _router.navigate(['/search']);
  }
}
