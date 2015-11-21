import {bootstrap, Component, provide, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import CandidateService from "./candidate_service";
import CandidateDetails from "./candidate_details";
import NewCandidate from "./new_candidate";
import EditCandidate from "./edit_candidate";
import {HTTP_BINDINGS} from 'angular2/http';
import IdentityCache from "./identity_cache";

import {
  RouteConfig,
  Route,
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  HashLocationStrategy,
  LocationStrategy
} from 'angular2/router';

import {reflector} from 'angular2/src/core/reflection/reflection';
import {ReflectionCapabilities} from 'angular2/src/core/reflection/reflection_capabilities';

import CandidatesComponent from "./candidates_component";

@Component({
  selector: 'my-app'
})
@View({
  templateUrl: "app.html",
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, CandidatesComponent]
})
@RouteConfig([
  new Route({path: '/candidates/:id', component: CandidateDetails, name: 'CandidateDetails'}),
  new Route({path: '/candidates/new', component: NewCandidate, name: 'NewCandidate'}),
  new Route({path: '/candidates/:id/edit', component: EditCandidate, name: 'EditCandidate'}),
])
class MyAppComponent {
    constructor() {
      this.name = "CampNG Angular 2 training";
    }
}

reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(MyAppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy}), CandidateService, IdentityCache, HTTP_BINDINGS ]);
