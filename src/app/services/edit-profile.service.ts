import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditProfileService {

  private storesUrl = this.globals.STORES_URL;
  tempStoreData: any = {};
  storeId: any;

  constructor(private http: HttpClient, private globals: Globals) { }


  updateStoreInfo(store: any): Observable<any> {

    let authToken = localStorage.getItem('auth_token');
    // console.log(authToken)

    let tempStore = localStorage.getItem('store');
    if (tempStore) {
      this.tempStoreData = JSON.parse(tempStore);
      this.storeId = this.tempStoreData.id;
      // console.log(this.storeId);
    };
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': 'JWT ' + authToken
      })
    };

    return this.http.patch(this.storesUrl + this.storeId + '/', store, httpOptions)

  }

}
