import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable, bind} from 'angular2';
import Rx from '@reactivex/rxjs';
import IdentityCache from "./identity_cache";
import DataMapping from "./data_mapping";
import {reflector} from 'angular2/src/core/reflection/reflection';

@DataMapping({foo: "bar"})
class Datum {

}

annotations = reflector.annotations(Datum);

@Injectable()
class CandidateService {
  constructor(http: Http, identityCache: IdentityCache) {
    this.http = http;
    this.cache = identityCache;
  }

  getCandidates() {
    return this.http.get('http://localhost:8000/candidates')
      .map(res => res.json())
      .map((candidates) => {
        return candidates.map((candidate) => this.cache.store(candidate));
      });
  }

  getCandidate(id) {
    return this.http.get('http://localhost:8000/candidates')
      .concatMap(res => res.json())
      .first((candidate) => {
        console.log(`I got called with: ${candidate}`);
        return candidate.id == id;
      });
      .map( (candidate) => this.cache.store(candidate));
  }

}

export default CandidateService;
