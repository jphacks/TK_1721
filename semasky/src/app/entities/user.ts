import { Entity } from './entity';

export class User extends Entity {
  public email: string;
  public password: string;

  constructor(obj?: JSON) {
    super(obj);
    obj = obj || <JSON>{};

    this.email = obj['email'];
  }
}
