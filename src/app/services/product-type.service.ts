import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductTypeService {

    private productTypeURL = this.globals.PRODUCT_TYPE_URL;
    authToken = localStorage.getItem('auth_token');

    constructor(private http: HttpClient, private globals: Globals) { }

    fetchProductTypes(): Observable<any> {
        const headers = new HttpHeaders({'Authorization': 'JWT ' + this.authToken})

        return this.http.get(this.productTypeURL, {headers})
    }

}
