import { Injectable } from '@angular/core';
import { StoreService } from '../base';
import { User } from '../../entities';
import { Logger } from '../../helpers';

@Injectable()
export class UserStoreService extends StoreService<User> {
  constructor() {
    super();
  }
}
