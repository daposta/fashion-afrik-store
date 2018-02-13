import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductTypeService } from '../../services/product-type.service';
import { CurrencyService } from '../../services/currency.service';
import { ColorService } from '../../services/color.service';
import { SizeService } from '../../services/size.service';
import { SubCategoryService } from '../../services/sub-category.service';


import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, CategoryService, ProductTypeService, CurrencyService,
  ColorService, SizeService, SubCategoryService]
})
export class ProductDetailComponent implements OnInit {
  
  product: Object= {};
  new_product: Object= {};
  host_address: string =  this.globals.HOST_URL; 
  categorys: any[];
   productTypes: any[];
    currencys: any[];
   colors: any[];
   sizes: any[];
   subs: any[];
  error: any;
  private formSubmitAttempt: boolean;
  productForm:FormGroup;

  constructor(private productSrv : ProductService, private route: ActivatedRoute, private globals: Globals,
    private categorySrv:CategoryService,  private productTypeSrv:ProductTypeService, fb: FormBuilder, 
     private currencySrv: CurrencyService, private colorSrv: ColorService,
    private sizeSrv: SizeService , private subCategorySrv: SubCategoryService) { 
        this.productForm = fb.group({
        'name':['', Validators.required],
        'description':['', Validators.required],
        'sizes':[[''], Validators.required],
        'colors':[[''], Validators.required],
        'otherColors':['', ],
        'price':['', Validators.required],
        'productCategory':['', Validators.required],
        'productType':['', Validators.required],
         'subCategory':['', Validators.required],
        'currency':['', Validators.required],
        'tags':['', Validators.required],
        'isClearance':['', ],
        'isNewArrival':['', ],
        'discountPrice':['', ],
        
      });
  }

  ngOnInit() {

     
	  	 this.route.params.switchMap((params: Params) => 
			 	this.productSrv.findProductByUUID( params['id']))
			 .subscribe(
			 	data => {
           this.product = data;
           let tags_temp = '';
           data.tags.forEach(item => {
          
             tags_temp += item.name + ', ';
           });

           this.product['tags_temp'] = tags_temp;

           let other_colors_temp = '';
           data.mixed_colors.forEach(item => {
          
             other_colors_temp += item.name + ', ';
           });

           this.product['other_colors_temp'] = other_colors_temp;

           let colors_list = [];
           data.colors.forEach(function(item:any){
             colors_list.push(item.id);
           });
           this.product['colors_list'] = colors_list;
           //set category as selected
          
           // this.product['category'] = data.category? data.category.id : null;
           //  this.product['product_ty'] = data.category? data.category.id : null;
         
         }

			 	);
      
       this.fetchCategorys();
       this.fetchProductTypes();
       this.fetchSubCategorys();
        this.currencySrv.fetchCurrencys().then(response => this.currencys = response.results)
      this.colorSrv.fetchColors().then(response => this.colors = response.results)
      this.sizeSrv.fetchSizes().then(response => this.sizes = response.results)
      

  };


  fetchSubCategorys(){
    this.subCategorySrv.fetchSubCategorys().then(response => this.subs = response.results)
    .catch(err => this.error = err)
  }


  checkColorSelected(color) {
    
    if(this.product['colors']){
      
      return this.product['colors'].findIndex(selUser => selUser.slug === color) > -1;
    }
    
  //return this.selectedUsers3.filter(selUser => selUser.id === user.id).length > 0;
  }


  checkSizeSelected(size) {
    
    if(this.product['sizes']){
      
      return this.product['sizes'].findIndex(selUser => selUser.name === size) > -1;
    }
    
  //return this.selectedUsers3.filter(selUser => selUser.id === user.id).length > 0;
  }


  fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
    .catch(error=> this.error = error )
  }


  fetchProductTypes(){
    this.productTypeSrv.fetchProductTypes().then(response =>this.productTypes = response.results  )
    .catch(error=> this.error = error )
  }


  updateProduct(){
    this.new_product['id'] = this.product['id'];
    this.productSrv.updateProductInfo(this.new_product);

  };


  removeOtherImages(productID){
    console.log(productID);
    alert('remove other');
  };


  removeBannerImage(productID){
     console.log(productID);
       alert('remove banner');
  };


  addOtherImages(){
    alert('add other');

  };




  addBannerImage(){
    alert('add banner image');

  };







}
