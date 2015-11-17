import {Component, provide, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import CandidateService from "./candidate_service";
import { Router, RouteParams } from 'angular2/router';

@Component({
    selector: 'candidate-edit'
})
@View({
  template: `
  <label>Name</label>
  <input [(ng-model)]="candidate.name" />
  <button (click)="save()">Save Candidate</button>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
class EditCandidate {
  constructor(candidateService: CandidateService, router: Router, routeParams: RouteParams) {
    this.candidateService = candidateService;
    this.candidateService.getCandidate(Number(routeParams.params.id)).subscribe( (candidate) => {
      this.candidate = candidate;
    });
    // this.candidate = {};
    this.router = router;
  }

  save() {
    this.candidateService.update(this.candidate).subscribe( () => {
      this.router.navigate(['/CandidateDetails', {'id':this.candidate.id}])
    });
  }
}

export default EditCandidate;
