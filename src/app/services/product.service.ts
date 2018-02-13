import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';


declare var $: any;


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
        formData.append('productType', data['productType']);
        formData.append('subCategory', data['subCategory']);
        formData.append('currency', data['currency']);
        formData.append('price', data['price']);
        formData.append('sizes', data['sizes']);
        formData.append('tags', data['tags']);
        formData.append('banner_image', data['bannerImage']);
         formData.append('isNewArrival', data['isNewArrival']);
          formData.append('isClearance', data['isClearance']);
           formData.append('discountPrice', data['discountPrice']);
           formData.append('colors', data['colors']);
            formData.append('otherColors', data['otherColors']);
        // formData.append('other_images', data['otherImages']);
        if(data['otherImages']){
             for (let i = 0; i < data['otherImages'].length; i++) {
            formData.append("other_images", data['otherImages'][i], data['otherImages'][i].name);
          }
        }
       

     this.http.post(this.productsUrl, formData, {headers}).subscribe(
         res => {
             let msg = JSON.parse(res['_body'])['message'];
              $.toast({
                  text: msg,
                   position: 'top-center',
                   'icon': 'success',
                  showHideTransition: 'slide',
              });
           
             this.router.navigateByUrl('products');
         },
         error =>{
        
        let msg = JSON.parse(error._body)['message'];
        $.toast({
            text: msg,
             position: 'top-center',
             icon: 'error',
             showHideTransition: 'slide',
        });
      })

  };

   updateProductInfo(product:any= {}){
     let v = this.page_header();
    //let _data = JSON.stringify(product);
    if (product){
        this.http.patch(this.productsUrl + product.id + '/', product, v).subscribe(
           data => {

             //this.toasterService.pop('success', 'Client Info updated', '');
             let msg = JSON.parse(data['_body'])['message'];
              $.toast({
                  text: msg,
                   position: 'top-center',
                   'icon': 'success',
                  showHideTransition: 'slide',
              });
              this.router.navigateByUrl('products/' + product.id);
            
           },
           error => {
             let msg = JSON.parse(error._body)['message'];
        
              $.toast({
                    text: msg,
                     position: 'top-center',
                     'icon': 'error',
                     showHideTransition: 'slide',
                });
           }
        );
    }
     

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
