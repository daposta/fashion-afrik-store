
import { Injectable } from '@angular/core';

Injectable()
export class Globals{
	HOST_URL =  'https://stores.vogueafriq.com/api';  //   'http://127.0.0.1:8000';//  
	LOGIN_URL =  this.HOST_URL + '/stores/api/login/';
    LOGOUT_URL = this.HOST_URL + '/stores/api/logout/';
    CATEGORYS_URL =  this.HOST_URL + '/stores/api/categorys/';
    PRODUCTS_URL =  this.HOST_URL + '/stores/api/products/';
    ORDERS_URL =  this.HOST_URL + '/stores/api/orders/';
    REGISTER_URL =  this.HOST_URL + '/stores/api/register/';
    DISEASE_URL =  this.HOST_URL + '/stores/api/diseases/';
    GENOTYPES_URL =  this.HOST_URL + '/stores/api/genotypes/';
    GENDER_URL =  this.HOST_URL + '/stores/api/genders/';
    PRODUCT_TYPE_URL =  this.HOST_URL + '/stores/api/product_types/';
    CURRENT_PROFILE_URL = this.HOST_URL + '/stores/api/me/'; //current_profile
   // PROFILE_DETAIL_URL = this.HOST_URL + '/client/api/profile_detail/';
    //FORGOT_PASS_URL = this.HOST_URL + '/client/api/forgot_password/';
    //RESET_PASS_URL = this.HOST_URL + '/client/api/reset_password/';
    ACCOUNT_ACTIVATION_URL =  this.HOST_URL + '/stores/api/activate/';

    
}
