import { Component, Input } from '@angular/core';
import { File } from '../../entities';
import { save } from '../../helpers';

@Component({
  selector: 'result-box',
  templateUrl: 'result-box.component.html'
})
export class ResultBoxComponent {
  @Input() file: File;

  download(event) {
    event.preventDefault();
    let self = this;
    // save(self.file.uri, self.file.name);

    document.getElementById("overlay").style.display = "block";
    document.getElementById(self.file.uri).style.display = "block";
  }
}
