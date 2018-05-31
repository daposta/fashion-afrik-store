import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from '../shared/api';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Injectable()
export class StoreService {
  public updateStoreUrl = this.globals.UPDATE_STORE_URL;
  public storeUrl = this.globals.STORES_URL;
  store: any = {};
  storeId: any;
  storeData: any;

  authToken = localStorage.getItem('auth_token');
  public updateStoreUrlId = this.updateStoreUrl + this.storeId + '/';

  constructor(private http: HttpClient, private router: Router, private globals: Globals) { }

  createStore(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.authToken
      })
    };

    return this.http.post(this.storeUrl, data, httpOptions)
  };

  editStoreProfile(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.authToken
      })
    };

    let tempStore = localStorage.getItem('store');
    if (tempStore) {
      this.storeData = JSON.parse(tempStore);
      this.storeId = this.storeData.id;
      // console.log(this.storeData);
      // console.log(this.storeId);
    };

    return this.http.patch(this.storeUrl + '/' + this.storeId + '/', data, httpOptions)
  }

}
