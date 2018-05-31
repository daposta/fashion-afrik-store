import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ColorService {

  private colorsUrl = this.globals.COLORS_URL;
  authToken = localStorage.getItem('auth_token');

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchColors(): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'JWT ' + this.authToken})

    return this.http.get(this.colorsUrl, {headers})

  }
  
}
