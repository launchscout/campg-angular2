import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable, bind} from 'angular2';
import Rx from '@reactivex/rxjs';
import IdentityCache from "./identity_cache";
import DataMapping from "./data_mapping";
import {reflector} from 'angular2/src/core/reflection/reflection';
// import socket from "./socket";
import {Headers} from 'angular2/http';
import {EventEmitter, Observable } from 'angular2';
import { Socket } from "phoenix_js";
import PhoenixChannels from "./phoenix_channels";

@DataMapping({foo: "bar"})
class Datum {

}

annotations = reflector.annotations(Datum);

@Injectable()
class CandidateService {
  constructor(http: Http, phoenixChannels: PhoenixChannels) {
    this.http = http;
    this.phoenixChannels = phoenixChannels;
    this.allCandidatesChannel = this.phoenixChannels.channel("candidates:all");
    this.allCandidatesChannel.join().subscribe();
  }

  getCandidates() {
    let httpObservable = this.http.get('http://localhost:4000/candidates').map( (resp) => resp.json());
    let phoenixObservable = this.allCandidatesChannel.observeMessage("change").map( (resp) => resp.candidates );
    return Observable.merge(httpObservable, phoenixObservable);
  }

  getCandidate(id) {
    let candidateChannel = this.phoenixChannels.channel(`candidates:${id}`);
    candidateChannel.join().subscribe();
    let httpObservable = this.http.get(`http://localhost:4000/candidates/${id}`).map( (resp) => resp.json());
    let phoenixObservable = candidateChannel.observeMessage("change").map( (resp) => resp.candidate );
    return Observable.merge(httpObservable, phoenixObservable);
  }

  create(candidate) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:4000/candidates", JSON.stringify({candidate: candidate}), {headers: headers}).map( (res) => res.json());
  }

  update(candidate) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`http://localhost:4000/candidates/${candidate.id}`, JSON.stringify({candidate: candidate}), {headers: headers}).map( (res) => res.json());
  }

}

export default CandidateService;
