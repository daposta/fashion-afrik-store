// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
// import { Router } from '@angular/router';
// import { Globals } from '../shared/api';
// import 'rxjs/add/operator/toPromise';

// declare var $: any;

// @Injectable()
// export class StoreService {
//   public updateStoreUrl = this.globals.UPDATE_STORE_URL;
//   store: any = {};
//   storeId: any;
//   // public updateStoreUrlId = this.updateStoreUrl + this.storeId +'/';

//   constructor(private http: Http, private router: Router, private globals: Globals) { }

//   editStore(mobile: string, address: string, description: string, storeId: any) {
//     let tempStore = localStorage.getItem('store');
//     if (tempStore) {
//       this.store = JSON.parse(tempStore);
//       this.storeId = this.store.user;
//       console.log(this.storeId);
//     }

//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     console.log(storeId);
//     return this.http.put(this.updateStoreUrl + this.storeId + '/', { headers })
//       .subscribe(res => {
//         let msg = JSON.parse(res['_body'])['message'];
//         console.log(msg);
//         $.toast({
//           text: msg,
//           position: 'top-center',
//           'icon': 'success',
//           showHideTransition: 'slide',
//         });
//       }, error => {
//         let msg = JSON.parse(error._body)['message'];
//         console.log(msg);
//         $.toast({
//           text: msg,
//           position: 'top-center',
//           icon: 'error',
//           showHideTransition: 'slide',
//         });
//       })
//   };

//   private page_header() {
//     let data = localStorage.getItem('auth_token');
//     let headers = new Headers();
//     let opt: RequestOptions;
//     headers.append('Authorization', 'JWT ' + data);
//     opt = new RequestOptions({ headers: headers });
//     return opt;
//   };


//   private handleError(error: any) {
//     console.error('An error occurred', error);
//     return Promise.reject(error.message || error);
//   };


// }
