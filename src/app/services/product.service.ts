import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


declare var $: any;


@Injectable()
export class ProductService {

    productsUrl = this.globals.PRODUCTS_URL;
    storeData: any = {};
    storeId: any;
    authToken = localStorage.getItem('auth_token');

    constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

    fetchProducts(): Observable<any> {
        let storeInfo = localStorage.getItem('store');
        if (storeInfo) {
            this.storeData = JSON.parse(storeInfo);
            this.storeId = this.storeData.id;
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.authToken
            })
        }
        return this.http.get(this.productsUrl, httpOptions)
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

        let formData = new FormData();
        formData.append("name", data['name']);
        formData.append('description', data['description']);
        formData.append('l1category', data['l1category']);
        formData.append('l2category', data['l2category']);
        formData.append('l3category', data['l3category']);
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
        const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

        return this.http.post(this.productsUrl, formData, { headers });
    }

    updateProduct(data: any, dirtyValues): Observable<any> {

        // let formData = new FormData();
        // formData.append("name", data['name']);
        // formData.append('description', data['description']);
        // formData.append('l1category', data['l1category']);
        // formData.append('l2category', data['l2category']);
        // formData.append('l3category', data['l3category']);
        // formData.append('currency', data['currency']);
        // formData.append('price', data['price']);
        // formData.append('sizes', data['sizes']);
        // formData.append('tags', data['tags']);
        // formData.append('banner_image', data['bannerImage']);
        // formData.append('isNewArrival', data['isNewArrival']);
        // formData.append('isClearance', data['isClearance']);
        // formData.append('discountPrice', data['discountPrice']);
        // formData.append('colors', data['colors']);
        // formData.append('mixedColor', data['otherColors']);
        // if (data['otherImages']) {
        //     for (let i = 0; i < data['otherImages'].length; i++) {
        //         formData.append("other_images", data['otherImages'][i], data['otherImages'][i].name);
        //     }
        // }
        const httpOptions = {
            headers: new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })
        };

        return this.http.patch(this.productsUrl + data.id + '/', dirtyValues, httpOptions)
    }

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

}
