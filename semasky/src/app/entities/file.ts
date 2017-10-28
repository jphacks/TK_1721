import { Entity } from './entity';

export class File extends Entity {
  public name: string;
  public format: string;
  public uri: string;

  constructor(obj?: JSON) {
    super(obj);
    obj = obj || <JSON>{};

    let self = this;
    self.name = obj['name'];
    self.format = obj['format'];
    self.uri = obj['uri'];
  }
}
