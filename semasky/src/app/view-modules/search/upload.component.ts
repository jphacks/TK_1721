import { Component } from '@angular/core';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  ngAfterViewInit() {
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
          // submit
        }
        reader.readAsText(files[i]);
      }
      droppable.classList.remove('ondrop');
    });
  }
}
