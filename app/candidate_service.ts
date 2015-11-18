import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable, bind} from 'angular2';
import Rx from '@reactivex/rxjs';
import IdentityCache from "./identity_cache";
import DataMapping from "./data_mapping";
import {reflector} from 'angular2/src/core/reflection/reflection';

import {Headers} from 'angular2/http';

@DataMapping({foo: "bar"})
class Datum {

}

annotations = reflector.annotations(Datum);

@Injectable()
class CandidateService {
  constructor(http: Http, identityCache: IdentityCache) {
    this.http = http;
    this.cache = identityCache;
    this.observers = [];
    this.candidateList = [];
    this.candidateObserverable = Rx.Observable.create( (observer) => {
      this.observers.push(observer);
    });

  }

  getCandidates() {
    this.fetchCandidates();
    return this.candidateObserverable;
  }

  fetchCandidates() {
    this.httpObservable = this.http.get('http://localhost:8000/candidates')
      .map(res => res.json())
      .map((candidates) => {
        return candidates.map((candidate) => this.cache.store(candidate));
      })
      .subscribe( (candidates) => {
        this.candidateList = candidates;
        this.notifyObservers();
      });
  }
  
  getCandidate(id) {
    return this.http.get('http://localhost:8000/candidates')
      .concatMap(res => res.json())
      .first((candidate) => {
        console.log(`I got called with: ${candidate}`);
        return candidate.id == id;
      })
      .map( (candidate) => this.cache.store(candidate));
  }

  notifyObservers() {
    
    this.observers.forEach( (observer) => {
      observer.next(this.candidateList);
    });
  }

  create(candidate) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.candidateList.push(candidate);
    this.notifyObservers();
    return this.http.post("http://localhost:8000/candidates", JSON.stringify(candidate), {headers: headers}).map( (res) => res.json());
  }

  update(candidate) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`http://localhost:8000/candidates/${candidate.id}`, JSON.stringify(candidate), {headers: headers}).map( (res) => res.json());
  }

}

export default CandidateService;
