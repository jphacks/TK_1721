export class Entity {
  public id: number;

  constructor(obj?: JSON) {
    obj = obj || <JSON>{};

    this.id = obj['id'];
  }
}
