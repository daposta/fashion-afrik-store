
import { Injectable } from '@angular/core';

Injectable()
export class Globals{
    HOST_URL =   'https://stores.vogueafriq.com/api';

    // Verified endpoints
    LOGIN_URL =  this.HOST_URL + '/login/';
    REGISTER_URL =  this.HOST_URL + '/register/';
    STORES_URL = this.HOST_URL + '/stores/'
    CURRENT_PROFILE_URL = this.HOST_URL + '/user/';
    DASHBOARD_DATA_URL =  this.HOST_URL + '/stores/store_dashboard/';
    TAGS_URL = this.HOST_URL + '/stores/tags/';
    CATEGORYS_URL =  this.HOST_URL + '/stores/l1categories/';
    PRODUCT_TYPE_URL =  this.HOST_URL + '/stores/l2categories/';
    SUB_CATEGORYS_URL =  this.HOST_URL + '/stores/l3categories/'; 
    COLORS_URL =  this.HOST_URL + '/stores/colors/';
    SIZES_URL =  this.HOST_URL + '/stores/sizes/';
    CURRENCY_URL =  this.HOST_URL + '/stores/currencys/';
    CHECK_PASSWORD_URL = this.HOST_URL + '/user/password-check/';
    USER_URL = this.HOST_URL + '/user/';
    LOGOUT_URL = this.HOST_URL + '/logout/';

    // Unverified endpoints    
    PRODUCTS_URL =  this.HOST_URL + '/stores/products/';
    ORDERS_URL =  this.HOST_URL + '/stores/api/orders/';
    GENOTYPES_URL =  this.HOST_URL + '/stores/api/genotypes/';
    GENDER_URL =  this.HOST_URL + '/stores/api/genders/';
    ORDER_ITEMS_URL =  this.HOST_URL + '/stores/order_items/';
    LATEST_ORDERS_URL =  this.HOST_URL + '/stores/api/latest_orders/';
    RECENT_PRODUCTS_URL =  this.HOST_URL + '/stores/api/recent_products/';
    UPDATE_STORE_URL = this.HOST_URL + '/admin/api/stores/';
    STORE_PRODUCTS_URL = this.HOST_URL + '/api/stores/';
    
    // PROFILE_DETAIL_URL = this.HOST_URL + '/client/api/profile_detail/';
     //FORGOT_PASS_URL = this.HOST_URL + '/client/api/forgot_password/';
    //RESET_PASS_URL = this.HOST_URL + '/client/api/reset_password/';
    // ACCOUNT_ACTIVATION_URL =  this.HOST_URL + '/stores/api/activate/';
}
