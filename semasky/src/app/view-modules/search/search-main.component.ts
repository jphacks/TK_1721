import { Component } from '@angular/core';
import { File } from '../../entities';
import { FileService } from '../../services/files';

@Component({
  selector: 'search-main',
  templateUrl: './search-main.component.html'
})
export class SearchMainComponent {
  public files: File[];

  constructor(
    private _file: FileService
  ) {
  }

  delay = (() => {
    let timer = 0;
    return (callback, ms) => {
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  ngAfterViewInit() {
    let self = this;
    let input: any = document.getElementById('search-input');
    input.addEventListener('keyup', e => {
      this.delay(() => {
        self._file.search(input.value, self.success.bind(self), self.error.bind(self));
      }, 100);
    });
  }

  success(files) {
    console.log(files);
  }

  error(e) {
    console.error(e);
  }
}
