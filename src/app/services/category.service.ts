import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
declare var $: any;


@Injectable()
export class CategoryService {

	private categoryURL =   this.globals.CATEGORYS_URL;

  constructor(private http: Http, private globals: Globals,  private router:Router) { }


  fetchCategories(){
  	  let v = this.page_header();
    return this.http.get(this.categoryURL, v)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  };

  saveCategory(data: any){
    let _data = JSON.stringify(data);
    let v = this.page_header();
     this.http.post(this.categoryURL, data, v).subscribe(
         data => {

         //  this.toasterService.pop('success', 'Disease saved', '');
             this.router.navigateByUrl('categorys');
         },
         error => {
        
        let msg = JSON.parse(error._body)['message'];
        $.toast({
            text: msg,
             position: 'top-center',
             icon: 'error',
             showHideTransition: 'slide',
        });
      }
      )

  };


   private page_header(){
     let data =  localStorage.getItem('auth_token');
      let headers = new Headers();
      let opt: RequestOptions;
      headers.append('Authorization', 'JWT ' + data );
      opt = new RequestOptions({headers: headers})  ;
      return opt;
  };


  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };


}
