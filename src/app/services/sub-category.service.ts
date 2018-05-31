import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class SubCategoryService {

    private subCategoryURL = this.globals.SUB_CATEGORYS_URL;
    authToken = localStorage.getItem('auth_token');

    constructor(private http: HttpClient, private globals: Globals) { }

    fetchSubCategorys(): Observable<any> {
        const headers = new HttpHeaders({'Authorization': 'JWT ' + this.authToken})

        return this.http.get(this.subCategoryURL, {headers})
    }
    
}
