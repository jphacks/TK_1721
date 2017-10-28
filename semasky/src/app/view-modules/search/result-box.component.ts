import { Component, Input } from '@angular/core';
import { FileService } from '../../services/files';
import { File } from '../../entities';
import { save } from '../../helpers';

@Component({
  selector: 'result-box',
  templateUrl: 'result-box.component.html'
})
export class ResultBoxComponent {
  @Input() file: File;

  constructor(
    private _file: FileService
  ) {
  }

  download(event) {
    event.preventDefault();
    let self = this;
    self._file.save(self.file.uri, e=>console.log(e),e=>console.error(e));
  }
}
