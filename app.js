import {bootstrap, Component, provide, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';

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
  template: `
  <h1>Hello {{name}}</h1>
  <input [(ng-model)]="name" />
  <nav>
    <a href="#/candidates" >Display candidates</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, CandidatesComponent]
})
@RouteConfig([
  new Route({path: '/candidates', component: CandidatesComponent, as: 'CandidatesComponent'})
])
class MyAppComponent {
    constructor() {
      this.name = "World";
    }
}

reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(MyAppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
