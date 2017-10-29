import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public register: boolean = true;

  constructor(
    private _router: Router
  ) {
    // _router.navigate(['/search']);
  }

  ngAfterViewInit() {
    let self = this;
    addEventListener('click', e => {
      let target: any = e.target;
      if (target.id) {
        if (target.id === 'login') {
          self.register = false;
        } else if (target.id === 'register') {
          self.register = true;
        }
      }
      e.stopPropagation();
    });
  }
}
