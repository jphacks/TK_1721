import { Component, Input } from '@angular/core';
import { File } from '../../entities';
import { FileService } from '../../services/files';
import { save } from '../../helpers';

@Component({
  selector: 'result-box',
  templateUrl: 'result-box.component.html'
})
export class ResultBoxComponent {
  @Input() file: File;
  public tags: string[] = [];

  constructor(
    private _file: FileService
  ) {
  }

  ngAfterViewInit() {
    let self = this;
    addEventListener('click', e => {
      if (document.getElementById("overlay").style.display === "block" && (<HTMLElement>(e.target)).tagName !== "A") {
        document.getElementById("overlay").style.display = "none";
        let elems = document.getElementsByClassName("file-detail");
        for (let i = 0; i < elems.length; i++) {
          let elem: any = elems[i];
          elem.style.display = "none";
        }
        e.stopPropagation();
      }
    });
    document.getElementById(self.file.uri).addEventListener('click', e => {
      e.stopPropagation();
    });

    self._file.getTags(self.file.id, self.success.bind(self), self.error.bind(self));
  }

  download(event) {
    event.preventDefault();
    let self = this;

    document.getElementById("overlay").style.display = "block";
    document.getElementById(self.file.uri).style.display = "block";
    event.stopPropagation();
  }

  save(event) {
    event.preventDefault();
    let self = this;
    save(self.file.uri, self.file.name);
    event.stopPropagation();
  }

  success(response) {
    let self = this;
    for (let tag of response["tags"]) {
      self.tags.push(tag);
    }
  }

  error(e) {
    console.error(e);
  }
}
