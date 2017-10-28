import { Component, Input } from '@angular/core';

@Component({
  selector: 'semasky-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  @Input() type: string;

  logout(event) {
    event.preventDefault();
  }
}
