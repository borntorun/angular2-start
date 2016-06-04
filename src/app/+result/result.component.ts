import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, RouteParams, OnActivate } from '@angular/router-deprecated';
import { Http, HTTP_PROVIDERS } from '@angular/http';

import { environment } from '../environment';
import { Location } from './shared/location.model';

import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css'],
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ HTTP_PROVIDERS ]
})
export class ResultComponent implements OnActivate {

  results: Array<Location> = [];

  constructor(
    private http: Http,
    private params: RouteParams
  ) {};

  routerOnActivate() {
    let query = this.params.get('query');
    this.getResults(query);
  };

  getResults(query: String) {
    this.http.get(environment.apiUrl, {
      search: 'address=' + query + '&sensor=false'
    })
      .map(res => res.json())
      .subscribe(data => this.results = data.results);
  };

}
