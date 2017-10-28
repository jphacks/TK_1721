export class Entity {
  public uid: string;

  constructor(obj?: JSON) {
    obj = obj || <JSON>{};

    this.uid = obj['uid'];
  }
}
