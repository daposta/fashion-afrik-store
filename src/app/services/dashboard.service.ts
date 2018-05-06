import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var $: any;

@Injectable()
export class DashboardService {

  private dashboardDataUrl = this.globals.DASHBOARD_DATA_URL;
  private latestOrdersUrl = this.globals.LATEST_ORDERS_URL;

  constructor(private http: Http, private globals: Globals, private router: Router) { }

  fetchDashboardDAta() {
    let v = this.page_header();
    return this.http.get(this.dashboardDataUrl, v)

  };


  fetchLatestOrders() {
    let v = this.page_header();
    return this.http.get(this.latestOrdersUrl, v)

    // .toPromise()
    // .then(response => response.json())
    // .catch(this.handleError);
  }

  fetchRecentProducts() {
    let v = this.page_header();
    return this.http.get(this.globals.RECENT_PRODUCTS_URL, v)

    // .toPromise()
    // .then(response => response.json())
    // .catch(this.handleError);
  }


  private page_header() {
    let data = localStorage.getItem('auth_token');
    let headers = new Headers();
    let opt: RequestOptions;
    headers.append('Authorization', 'JWT ' + data);
    opt = new RequestOptions({ headers: headers });
    return opt;
  }


}
