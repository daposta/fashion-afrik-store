import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'


@Injectable()
export class CategoryService {

  categoryURL = this.globals.CATEGORYS_URL;
  productTypeURL = this.globals.PRODUCT_TYPE_URL;
  subCategoryURL = this.globals.SUB_CATEGORYS_URL;
  authToken = localStorage.getItem('auth_token');

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchProductTypesParam(category): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

    let params = new HttpParams().set('l1category', category)

    return this.http.get(this.productTypeURL, { headers: headers, params })
  }

  fetchSubCatTypesParam(productType, category): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

    let params = new HttpParams().set('l2category', productType).set('l1category', category)

    return this.http.get(this.subCategoryURL, { headers: headers, params })
  }

  fetchCategories(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

    return this.http.get(this.categoryURL, { headers })
  }

}
