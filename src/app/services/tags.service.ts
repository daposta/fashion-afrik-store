import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class TagsService {
  private tagsUrl = this.globals.TAGS_URL;
  authToken = localStorage.getItem('auth_token');

  constructor(private http: HttpClient, private globals: Globals) { }

  fetchTags(): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'JWT ' + this.authToken})

    return this.http.get(this.tagsUrl, {headers})
  }

}
