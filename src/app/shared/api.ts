
import { Injectable } from '@angular/core';

Injectable()
export class Globals{
	HOST_URL =  'http://139.162.248.210:8004';  //  'http://127.0.0.1:8000';//    
	LOGIN_URL =  this.HOST_URL + '/stores/api/login/';
    LOGOUT_URL = this.HOST_URL + '/stores/api/logout/';
    CATEGORYS_URL =  this.HOST_URL + '/stores/api/categorys/';
    PRODUCTS_URL =  this.HOST_URL + '/stores/api/products/';
    ORDERS_URL =  this.HOST_URL + '/store/api/orders/';
    HMOS_URL =  this.HOST_URL + '/client/api/hmos/';
    DISEASE_URL =  this.HOST_URL + '/client/api/diseases/';
    GENOTYPES_URL =  this.HOST_URL + '/client/api/genotypes/';
    GENDER_URL =  this.HOST_URL + '/client/api/genders/';
    CREATE_PROFILE_URL =  this.HOST_URL + '/client/api/create_profile/';
    CURRENT_PROFILE_URL = this.HOST_URL + '/client/api/current_profile/'; //current_profile
    PROFILE_DETAIL_URL = this.HOST_URL + '/client/api/profile_detail/';
    FORGOT_PASS_URL = this.HOST_URL + '/client/api/forgot_password/';
    RESET_PASS_URL = this.HOST_URL + '/client/api/reset_password/';
    VERTIFY_NUMBER_URL =  this.HOST_URL + '/client/api/activate_user/';
    NEWSLETTER_UNSUBSCRIBE_URL =  this.HOST_URL + '/client/api/newsletter_unsubscribe/';

    
}
