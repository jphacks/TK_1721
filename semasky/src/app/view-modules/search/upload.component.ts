import { Component } from '@angular/core';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  ngAfterViewInit() {
    let droppable = document.getElementById('droppable');
    droppable.addEventListener('dragover', e => {
      e.stopPropagation();
      e.preventDefault();
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
      console.log(data);
    });
  }
}
