import { Injectable } from 'angular2';
import _ from "lodash";

@Injectable()
class IdentityCache {

  constructor() {
    this.cache = {};
  }

  store(value) {
    if this.cache[value.id] {
      _.merge(this.cache[value.id], value);
      return this.cache[value.id];
    } else {
      this.cache[value.id] = value;
      return value;
    }
  }

  fetch(id) {
    return this.cache[id];
  }

}

export default IdentityCache;
