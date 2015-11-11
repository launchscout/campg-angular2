import {Component, provide, View, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
    selector: 'candidate-list'
})
@View({
  template: `
  <ul>
    <li *ng-for="#candidate of candidates">{{candidate.name}}</li>
  </ul>
  `,
  directives: [CORE_DIRECTIVES]
})
class CandidatesComponent {
    constructor() {
      this.candidates = [{id: 1, name: "Bob"}, {id: 2, name: "Fred"}];
    }
}

export default CandidatesComponent
