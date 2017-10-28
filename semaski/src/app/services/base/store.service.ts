import { Entity } from '../../entities';
import { Logger } from '../../helpers';

export abstract class StoreService<T extends Entity> {
  protected _current: T;
  protected _list: T[] = [];
  protected _stashed: T[] = [];
  protected _map: {[uid: string]: T} = {};

  /*
   * Helpers
   */
  exists(uid: string): boolean {
    let res = this.getObject(uid, false);
    if (!!res) {
      return true;
    } else {
      return false;
    }
  }

  copyList(): T[] {
    let aList: T[] = [];
    for (let item of this._list) {
      aList.push(this._map[item.uid]);  // copy objects references
    }
    return aList;
  }

  reset(): void {
    this.unbind();
    this.popAllObjects();
    this.deleteAllObjects();
  }


  /*
   * Base StoreService
   */

   // stash
   get stashed() {
     return this._stashed;
   }
   stash(object: T): void {
     this._stashed.push(object);
   }
   stashAll(objects: T[]): void {
     for (let object of objects) {
       this.stash(object);
     }
   }
   unstashAll(): void {
     for (let i = 0; i < this._stashed.length; i++) {
       this.unstash();
     }
   }
   unstash(): T {
     return this._stashed.shift();
   }

  // current
  get current() {
    return this._current
  }
  set current(object: any) {
    Logger.error(`No direct assertion to current is allowed. Use \`bind\` instead.`)
  }

  bind(object: T, override: boolean = true): void {
    if (!this._current) {
      Logger.log('\`current\` initialized', object);
    } else {
      if (!override) {
        Logger.error(`\`current\` can only be override with \`override = true\` option.`)
        return;
      } else {
        if (object.uid === this._current.uid) {
          Logger.warn('attempt to bind same object.', object);
          return;
        }
        Logger.log('`\`current\` rebind.', object);
      }
    }
    this._current = object;
    this.addObject(object, false);
  }
  unbind(): void {
    Logger.log(`\`current\` deleted.`);
    this._current = null;
  }

  // list
  get list() {
    return this._list;
  }

  set list(object: any) {
    Logger.error(`No direct assertion to list is allowed. Use \`pushObject\` or 'pushObjects' instead.`)
  }

  getObjectWithIndex(index: number): T {
    if (this._list.length >= index) {
      return this._list[index];
    } else {
      Logger.warn(`index ${index} out of bounds. length=${this._list.length}.`);
      return null;
    }
  }
  firstObject(): T {
    return this.getObjectWithIndex(0);
  }
  lastObject(): T {
    return this.getObjectWithIndex(this._list.length-1);
  }

  unshiftObject(object: T): void {
    this._list.unshift(object);
    if (!this._map[object.uid]) {
      this.addObject(object);
    }
  }

  unshiftObjects(objects: T[]): void {
    for (let object of objects) {
      this.unshiftObject(object);
    }
  }

  shiftObject(): T {
    return this._list.shift();
  }

  shiftObjects(count: number): T[] {
    let shiftedList: T[] = [];
    for (let _i = 0; _i < count; _i++) {
      shiftedList.push(this.shiftObject());
    }

    return shiftedList;
  }

  shiftAllObjects(del: boolean = true): T[] | void {
    if (del) {
      this._list = [];
      return;
    } else {
      return this.shiftObjects(this._list.length);
    }
  }

  pushObject(object: T): void {
    this._list.push(object);
    if (!this.exists(object.uid)) {
      this.addObject(object);
    }
  }

  pushObjects(objects: T[]): void {
    for (let object of objects) {
      this.pushObject(object);
    }
  }

  popObject(): T {
    return this._list.pop();
  }

  popObjects(count: number): T[] {
    let popedList: T[] = [];
    for (let _i = 0; _i < count; _i++) {
      popedList.push(this.popObject());
    }
    return popedList
  }

  popAllObjects(del: boolean = true): T[] | void {
    if (del) {
      this._list = [];
      return;
    } else {
      return this.popObjects(this._list.length);
    }
  }

  // map
  get map() {
    Logger.warn(`direct call map is DEPRECATED. Use \`getObject\` instead.`);
    return this._map;
  }

  set map(object: any) {
    Logger.error(`No direct assertion to map is allowed. Use \`addObject\` or 'addObjects' instead.`)
  }

  getObject(uid: string, validate: boolean = true): T {
    if (!uid) {
      if (validate) {
        Logger.error(`uid is empty.`);
      }
      return null;
    }

    if (!this._map[uid]) {
      if (validate) {
        Logger.error(this, `No object exists in map with uid=\`${uid}\`.`);
      }
      return null;
    } else {
      return this._map[uid];
    }
  }

  addObject(object: T, validate: boolean = true, override: boolean = false): void {
    if (!object.uid) {
      Logger.error(`object has no key of uid.`, object);
      return;
    }

    if (this._map[object.uid]) {
      if (validate) {
        if (override) {
          Logger.info(`${object.uid} overrided with: `, object);
          this._map[object.uid] = object;
        } else {
          Logger.warn(`${object.uid} already stored in map. Attempted to store: `, object, `Original value: `, this._map[object.uid]);
        }
      } else {
        if (override) {
          this._map[object.uid] = object;
        }
      }
    } else {
      Logger.log(`${object.uid} added.`, object);
      this._map[object.uid] = object;
    }
  }

  addObjects(objects: T[], override: boolean = false): void {
    for (let object of objects) {
      this.addObject(object, override);
    }
  }

  deleteObject(uid: string): void {
    if (!this._map[uid]) {
      Logger.warn(`map doesn't have object with uid: ${uid}.`)
      return
    } else {
      // delete this._map[uid];
      this._map[uid] = null;
    }
  }

  deleteObjects(uids: string[]): void {
    for (let uid of uids) {
      this.deleteObject(uid);
    }
  }

  deleteAllObjects(): void {
    this._map = {};

    // for (let uid in this._map) {
    //   this.deleteObject(uid);
    // }
  }
}
