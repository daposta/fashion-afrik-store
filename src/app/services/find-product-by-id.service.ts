import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FindProductByIdService {

    private productsUrl = this.globals.PRODUCTS_URL;
    authToken = localStorage.getItem('auth_token');

    constructor(private http: HttpClient, private globals: Globals) { }

    findProductByUUID(data: string) {
        const headers = new HttpHeaders({'Authorization': 'JWT ' + this.authToken})

        return this.http.get(this.productsUrl + data + '/', {headers})
    }

}