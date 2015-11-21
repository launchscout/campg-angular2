import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable, bind} from 'angular2';
import Rx from '@reactivex/rxjs';
import IdentityCache from "./identity_cache";
import DataMapping from "./data_mapping";
import {reflector} from 'angular2/src/core/reflection/reflection';
// import socket from "./socket";
import {Headers} from 'angular2/http';
import {EventEmitter, Observable } from 'angular2';
import {Socket} from "../phoenix/phoenix";
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
    this.candidatesEmitter = new EventEmitter();
    // this.emitCandidates();
    this.socket =  new Socket("ws://localhost:4000/socket");
    this.socket.connect();

  }

  emitCandidates() {
    this.candidateList.push({name: "Foo " + this.candidateList.length});
    this.candidatesEmitter.next(this.candidateList);
    setTimeout( () => {
      this.emitCandidates();
    }, 1000);
  }
  getCandidates() {
    this.channel = this.socket.channel("candidates:all", {});

    this.channel.join()
      .receive("ok", resp => {
        console.log("connected", resp.candidates);
        // setTimeout( () => {
          this.candidatesEmitter.next(resp.candidates);
        // }, 500);

      })
      .receive("error", resp => { console.log("Unable to join", resp) });

    this.channel.on("change", (resp) => {
      console.log("change", resp.candidates);
      this.candidatesEmitter.next(resp.candidates);
    });
    // this.fetchCandidates();
    return this.candidatesEmitter;
  }



  fetchCandidates() {
    this.httpObservable = this.http.get('http://localhost:4000/candidates')
      .map(res => res.json())
      .map((candidates) => {
        return candidates.map((candidate) => this.cache.store(candidate));
      })
      .subscribe( (candidates) => {
        this.candidatesEmitter.next(candidates);
      });
  }

  getCandidate(id) {
    return this.http.get(`http://localhost:4000/candidates/${id}`)
      .map(res => res.json())
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
    return this.http.post("http://localhost:4000/candidates", JSON.stringify({candidate: candidate}), {headers: headers}).map( (res) => res.json());
  }

  update(candidate) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`http://localhost:4000/candidates/${candidate.id}`, JSON.stringify({candidate: candidate}), {headers: headers}).map( (res) => res.json());
  }

}

export default CandidateService;
