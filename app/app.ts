import {bootstrap, Component, provide, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import CandidateService from "./candidate_service";
import CandidateDetails from "./candidate_details";
import {HTTP_BINDINGS} from 'angular2/http';

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
  new Route({path: '/candidates/:id', component: CandidateDetails, as: 'CandidateDetails'})
])
class MyAppComponent {
    constructor() {
      this.name = "CampNG Angular 2 training";
    }
}

reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(MyAppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy}), CandidateService, HTTP_BINDINGS ]);
