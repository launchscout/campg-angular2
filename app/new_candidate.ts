import {Component, provide, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import CandidateService from "./candidate_service";
import { Router } from 'angular2/router';

@Component({
    selector: 'candidate-new'
})
@View({
  template: `
  <label>Name</label>
  <input [(ng-model)]="candidate.name" />
  <button (click)="save()">Create Candidate</button>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
class NewCandidate {
  constructor(candidateService: CandidateService, router: Router) {
    this.candidateService = candidateService;
    this.router = router;
    this.candidate = {};
  }

  save() {
    this.candidateService.create(this.candidate).subscribe( (newCandidate) => {
      this.router.navigate(['/CandidateDetails', {'id':newCandidate.id}])
    });
  }
}

export default NewCandidate
