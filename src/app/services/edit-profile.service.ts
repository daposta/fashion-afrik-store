import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Injectable()
export class EditProfileService {

  private updateStoreUrl = this.globals.UPDATE_STORE_URL;
  tempStoreData: any = {};
  storeId: any;

  constructor(private http: Http, private globals: Globals, private router: Router) { }

  updateStoreInfo(store: any = {}) {
    let tempStore = localStorage.getItem('store');
    if (tempStore) {
      this.tempStoreData = JSON.parse(tempStore);
      this.storeId = this.tempStoreData.user;
      console.log(this.storeId);
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let v = this.page_header();

    if(store) {
      this.http.put(this.updateStoreUrl + this.storeId + '/', store, {headers})
        .subscribe(
          data => {
            let msg  = JSON.parse(data['_body'])['message'];
            console.log(msg);
            console.log(data);
          },
          error => {
            let msg = JSON.parse(error._body)['message'];
            console.log(msg);
            console.log(error);
          }
        )
    }
  };

  private page_header() {
    let data = localStorage.getItem('auth_token');
    let headers = new Headers();
    let opt: RequestOptions;
    headers.append('Authorization', 'JWT ' + data);
    opt = new RequestOptions({ headers: headers });
    return opt;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

}
