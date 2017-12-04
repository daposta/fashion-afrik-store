import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  private productsUrl = this.globals.PRODUCTS_URL; 

  constructor(private http: Http, private globals: Globals,  private router:Router) { }

  fetchProducts(){
  	  let v = this.page_header();
    return this.http.get(this.productsUrl, v)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  };


  findProductByUUID(data: string){
   
    let v = this.page_header();
     return this.http.get(this.productsUrl + data +'/', v)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  };


  saveProduct(data: any){
   
     let token =  localStorage.getItem('auth_token');
      let headers = new Headers();
     
      headers.append('Authorization', 'JWT ' + token );
    //  headers.append('Content-Type', 'multipart/form-data');

      let formData = new FormData();
        formData.append("name", data['name']);
        formData.append('description', data['description']);
        formData.append('category', data['category']);
        formData.append('price', data['price']);
        formData.append('sizes', data['sizes']);
        formData.append('tags', data['tags']);
        formData.append('banner_image', data['bannerImage']);
        formData.append('other_images', data['otherImages']);

     this.http.post(this.productsUrl, formData, {headers}).subscribe(
         data => {

           
             this.router.navigateByUrl('products');
         },
         error => console.log(error.json().message)
      )

  };

  private page_header(){
     let data =  localStorage.getItem('auth_token');
      let headers = new Headers();
      let opt: RequestOptions;
      headers.append('Authorization', 'JWT ' + data );
      opt = new RequestOptions({headers: headers})  ;
      return opt;
  }

   private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

}
