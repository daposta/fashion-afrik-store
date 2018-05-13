import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


declare var $: any;


@Injectable()
export class ProductService {

    // private productsUrl = this.globals.STORE_PRODUCTS_URL;
    private productsUrl = this.globals.PRODUCTS_URL;
    storeData: any = {};
    storeId: any;

    // constructor(private http: Http, private globals: Globals, private router: Router) { }
    constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

    fetchProducts(): Observable<any> {
        let data = localStorage.getItem('auth_token');
        let storeInfo = localStorage.getItem('store');
        if (storeInfo) {
            this.storeData = JSON.parse(storeInfo);
            this.storeId = this.storeData.id;
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json', 'Authorization': 'JWT ' + data
            })
        }
        // return this.http.get(this.productsUrl + this.storeId + '/products/', httpOptions)
        return this.http.get(this.productsUrl, httpOptions)
            .catch(this.handleError);
    };

    // findProductByUUID(data: string) {

    //     let v = this.page_header();
    //     return this.http.get(this.productsUrl + data + '/', v)
    //         .map(response => response.json())
    //         .toPromise()
    //         // .then(response => response.json())
    //         // .catch(this.handleError);
    // };

    saveProduct(data: any): Observable<any> {
        let token = localStorage.getItem('auth_token');

        let formData = new FormData();
        formData.append("name", data['name']);
        formData.append('description', data['description']);
        formData.append('category', data['productCategory']);
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
        if (data['otherImages']) {
            for (let i = 0; i < data['otherImages'].length; i++) {
                formData.append("other_images", data['otherImages'][i], data['otherImages'][i].name);
            }
        }
        const headers = new HttpHeaders({ 'Authorization': 'JWT ' + token })

        return this.http.post(this.productsUrl, formData, { headers });
    }


    // saveProduct(data: any) {
    //     let token = localStorage.getItem('auth_token');
    //     let headers = new Headers();

    //     headers.append('Authorization', 'JWT ' + token);
    //     let formData = new FormData();
    //     formData.append("name", data['name']);
    //     formData.append('description', data['description']);
    //     formData.append('category', data['productCategory']);
    //     formData.append('productType', data['productType']);
    //     formData.append('subCategory', data['subCategory']);
    //     formData.append('currency', data['currency']);
    //     formData.append('price', data['price']);
    //     formData.append('sizes', data['sizes']);
    //     formData.append('tags', data['tags']);
    //     formData.append('banner_image', data['bannerImage']);
    //     formData.append('isNewArrival', data['isNewArrival']);
    //     formData.append('isClearance', data['isClearance']);
    //     formData.append('discountPrice', data['discountPrice']);
    //     formData.append('colors', data['colors']);
    //     formData.append('otherColors', data['otherColors']);
    //     if (data['otherImages']) {
    //         for (let i = 0; i < data['otherImages'].length; i++) {
    //             formData.append("other_images", data['otherImages'][i], data['otherImages'][i].name);
    //         }
    //     }


    //     this.http.post(this.productsUrl, formData, { headers }).subscribe(
    //         res => {
    //             console.log(formData);
    //             let msg = JSON.parse(res['_body'])['message'];
    //             console.log(msg);
    //             console.log(res['_body']);
    //             $.toast({
    //                 text: msg,
    //                 position: 'top-center',
    //                 icon: 'success',
    //                 showHideTransition: 'slide',
    //             });

    //             this.router.navigateByUrl('products');
    //         },
    //         error => {

    //             console.log(error._body);
    //             let msg = JSON.parse(error._body)['message'];
    //             console.log(msg);
    //             $.toast({
    //                 text: msg,
    //                 position: 'top-center',
    //                 icon: 'error',
    //                 loader: false,
    //                 showHideTransition: 'plain',
    //                 allowToastClose: false,
    //                 hideAfter: 2000
    //             });
    //         })

    // };

    // updateProductInfo(product: any = {}) {
    //     let v = this.page_header();
    //     //let _data = JSON.stringify(product);
    //     if (product) {
    //         this.http.patch(this.productsUrl + product.id + '/', product, v).subscribe(
    //             data => {

    //                 //this.toasterService.pop('success', 'Client Info updated', '');
    //                 let msg = JSON.parse(data['_body'])['message'];
    //                 $.toast({
    //                     text: msg,
    //                     position: 'top-center',
    //                     'icon': 'success',
    //                     showHideTransition: 'slide',
    //                 });
    //                 this.router.navigateByUrl('products/' + product.id);

    //             },
    //             error => {
    //                 let msg = JSON.parse(error._body)['message'];

    //                 $.toast({
    //                     text: msg,
    //                     position: 'top-center',
    //                     'icon': 'error',
    //                     showHideTransition: 'slide',
    //                 });
    //             }
    //         );
    //     }


    // };

    private page_header() {
        let data = localStorage.getItem('auth_token');
        let headers = new Headers();
        let opt: RequestOptions;
        headers.append('Authorization', 'JWT ' + data);
        opt = new RequestOptions({ headers: headers });
        return opt;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };

}
