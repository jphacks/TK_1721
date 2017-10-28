import { Component } from '@angular/core';
import { File } from '../../entities';

@Component({
  selector: 'search-main',
  templateUrl: './search-main.component.html'
})
export class SearchMainComponent {
  public files: File[];

  ngAfterViewInit() {
    let input = document.getElementById('search-input');
    input.addEventListener('keyup', e => {
      console.log("hoge");
    });
  }
}
