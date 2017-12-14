import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, CategoryService]
})
export class ProductDetailComponent implements OnInit {
  
  product: Object= {};
  new_product: Object= {};
  host_address: string =  this.globals.HOST_URL; 
  categorys: any[];
  error: any;
  private formSubmitAttempt: boolean;
  productForm:FormGroup;

  constructor(private productSrv : ProductService,private route: ActivatedRoute, private globals: Globals,
    private categorySrv:CategoryService, fb: FormBuilder) { 
        this.productForm = fb.group({
        'name':['', Validators.required],
        'description':['', Validators.required],
        'sizes':['', Validators.required],
        'price':['', Validators.required],
        'productCategory':['', Validators.required],
        'tags':['', Validators.required],
        
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

           let sizes_temp = '';
           data.sizes.forEach(item => {
          
             sizes_temp += item.name + ', ';
           });

           this.product['sizes_temp'] = sizes_temp;
           //set category as selected
          
           this.product['category'] = data.category? data.category.id : null;
          
         }
			 	);
       this.fetchCategorys();
  };


  fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
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
