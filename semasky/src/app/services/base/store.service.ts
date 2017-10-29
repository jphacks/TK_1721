import { Entity } from '../../entities';
import { Logger } from '../../helpers';

export abstract class StoreService<T extends Entity> {
  protected _current: T;
  protected _list: T[] = [];
  protected _stashed: T[] = [];
  protected _map: {[id: number]: T} = {};

  /*
   * Helpers
   */
  exists(id: number): boolean {
    let res = this.getObject(id, false);
    if (!!res) {
      return true;
    } else {
      return false;
    }
  }

  copyList(): T[] {
    let aList: T[] = [];
    for (let item of this._list) {
      aList.push(this._map[item.id]);  // copy objects references
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
        if (object.id === this._current.id) {
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
    if (!this._map[object.id]) {
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
    if (!this.exists(object.id)) {
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

  getObject(id: number, validate: boolean = true): T {
    if (!id) {
      if (validate) {
        Logger.error(`id is empty.`);
      }
      return null;
    }

    if (!this._map[id]) {
      if (validate) {
        Logger.error(this, `No object exists in map with id=\`${id}\`.`);
      }
      return null;
    } else {
      return this._map[id];
    }
  }

  addObject(object: T, validate: boolean = true, override: boolean = false): void {
    if (!object.id) {
      Logger.error(`object has no key of id.`, object);
      return;
    }

    if (this._map[object.id]) {
      if (validate) {
        if (override) {
          Logger.info(`${object.id} overrided with: `, object);
          this._map[object.id] = object;
        } else {
          Logger.warn(`${object.id} already stored in map. Attempted to store: `, object, `Original value: `, this._map[object.id]);
        }
      } else {
        if (override) {
          this._map[object.id] = object;
        }
      }
    } else {
      Logger.log(`${object.id} added.`, object);
      this._map[object.id] = object;
    }
  }

  addObjects(objects: T[], override: boolean = false): void {
    for (let object of objects) {
      this.addObject(object, override);
    }
  }

  deleteObject(id: number): void {
    if (!this._map[id]) {
      Logger.warn(`map doesn't have object with id: ${id}.`)
      return
    } else {
      // delete this._map[id];
      this._map[id] = null;
    }
  }

  deleteObjects(ids: number[]): void {
    for (let id of ids) {
      this.deleteObject(id);
    }
  }

  deleteAllObjects(): void {
    this._map = {};

    // for (let .id in this._map) {
    //   this.deleteObject(.id);
    // }
  }
}
