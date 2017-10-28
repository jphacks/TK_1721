import { Component } from '@angular/core';

@Component({
  selector: 'semasky-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  logout(event) {
    event.preventDefault();
  }
}
