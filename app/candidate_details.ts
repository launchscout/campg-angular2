import {Component, provide, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import CandidateService from "./candidate_service";
import _ from "lodash";

import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    selector: 'candidate-details'
})
@View({
  template: `
<div *ng-if="candidate">
  <dl>
    <dd>Name</dd>
    <dt>{{candidate.name}}</dt>
  </dl>
  <a [router-link]="['/EditCandidate', {'id':candidate.id}]">Edit</a>
</div>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
class CandidateDetails {
  constructor(candidateService: CandidateService, routeParams: RouteParams) {
    this.candidateService = candidateService;
    candidateService.getCandidate(Number(routeParams.params.id)).subscribe( (candidate) => {
      this.candidate = candidate;
    });
  }
}

export default CandidateDetails
