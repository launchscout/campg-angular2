import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable, bind} from 'angular2';
import Rx from '@reactivex/rxjs';

@Injectable()
class CandidateService {
  constructor(http: Http) {
    this.http = http;
  }

  getCandidates() {
    return this.http.get('http://localhost:8000/candidates').map(res => res.json());
  }

  getCandidate(id) {
    return this.http.get('http://localhost:8000/candidates')
      .concatMap(res => res.json())
      .first((candidate) => {
        console.log(`I got called with: ${candidate}`);
        return candidate.id == id;
      });
    // Rx.Observable.fromArray([1, 2, 3]).first( (x) => { return x == 1}).subscribe( (x) => { console.log(`I got ${x}`)});
    // return Rx.Observable.from(this.getCandidates()).first( (candidate) => {
    //   return candidate.id == id;
    // });
  }

}

export default CandidateService;
