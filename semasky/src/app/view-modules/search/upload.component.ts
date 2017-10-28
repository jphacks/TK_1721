import { Component } from '@angular/core';
import { FileService } from '../../services/files';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  constructor(
    private _file: FileService
  ) {
  }

  ngAfterViewInit() {
    let self = this;

    let droppable = document.getElementById('droppable');
    let counter = 0;
    droppable.addEventListener('dragover', e => {
      e.stopPropagation();
      e.preventDefault();
    });
    droppable.addEventListener('dragenter', e => {
      e.stopPropagation();
      e.preventDefault();

      counter++;
      droppable.classList.add('ondrop');
    });
    droppable.addEventListener('dragleave', e => {
      e.stopPropagation();
      e.preventDefault();

      counter--;
      if (counter === 0) {
        droppable.classList.remove('ondrop');
      }
    });
    droppable.addEventListener('drop', e => {
      e.stopPropagation();
      e.preventDefault();

      let files = e.dataTransfer.files;
      let data = [];
      for (let i = 0; i < files.length; i++) {
        let reader: any = new FileReader();
        reader.onload = e => {
          self._file.submit({
            uid: "hoge",
            filename: files[i].name,
            file: e.target.result
          }, self.success.bind(self), self.success.bind(self));
        }
        reader.readAsBinaryString(files[i]);
      }
      droppable.classList.remove('ondrop');
    });
  }

  success() {
  }

  error(e) {
    console.error(e);
  }
}
