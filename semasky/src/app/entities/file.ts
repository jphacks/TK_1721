import { Entity } from './entity';

export class File extends Entity {
  public name: string;
  public format: string;
  public uri: string;
  public formatImage: string;

  constructor(obj?: JSON) {
    super(obj);
    obj = obj || <JSON>{};

    let self = this;
    self.name = obj['name'];
    self.format = !!(obj['name'].match(/.*\.(\w{1,3})/)) ? obj['name'].match(/.*\.(\w{1,3})/)[1] : 'other';
    self.uri = obj['hashfn'];

    switch (self.format) {
      case 'docs':
      self.format = 'doc';
      break;
      case 'xlsx':
      self.format = 'xls';
      break;
      case 'pptx':
      self.format = 'ppt';
      break;
      case 'jpeg':
      self.format = 'jpg';
      break;
      case 'htm':
      self.format = 'html';
      break;
    }

    if (['c', 'cpp', 'csharp', 'css', 'gif', 'html', 'jpg', 'js', 'ml', 'mov', 'pdf', 'png', 'ppt', 'py', 'rb', 'txt', 'xls', 'zip'].indexOf(self.format) === -1) {
      self.format = 'other';
    }

    self.formatImage = `assets/images/${self.format}.png`;
  }
}
