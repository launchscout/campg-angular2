import { Injectable } from 'angular2';

@Injectable()
class IdentityCache {

  constructor() {
    this.cache = {};
  }

  loadFromCache(value) {
    if this.cache[value.id] {
      return this.cache[value.id];
    } else {
      this.cache[value.id] = value;
      return value;
    }
  }

  get(id) {
    return this.cache[id];
  }

  put(id, value) {
    value.cachedAt = new Date();
    this.cache[id] = value;
  }

}

export default IdentityCache;
