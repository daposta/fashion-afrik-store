import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormArray} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { ProductTypeService } from '../../services/product-type.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { CategoryService } from '../../services/category.service';



@Component({
  selector: 'app-sub-category-detail',
  templateUrl: './sub-category-detail.component.html',
  styleUrls: ['./sub-category-detail.component.css'],
  providers: [ ProductTypeService, SubCategoryService , CategoryService]

})
export class SubCategoryDetailComponent implements OnInit {

  private formSubmitAttempt: boolean;
  subCategoryForm:FormGroup;
  subCategory: any= {};
  productTypes: any[];
  items: any[] = [];
  categorys: any[];
  error: any;
  pt:any;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, 
  	private productTypeSrv:ProductTypeService, private subCategorySrv:SubCategoryService,
    private categorySrv:CategoryService) { }

   ngOnInit() {
  	 this.subCategoryForm = this.fb.group({
        'name':['', Validators.required],
         'productType':['', Validators.required],
          'category':['', Validators.required],
        

      });
       this.fetchProductTypes();
       this.fetchCategorys();

  	 this.route.params.switchMap((params: Params) => 
			 	this.subCategorySrv.findSubCategoryByID( params['id']))
			 .subscribe(
			 	data => {
			           this.subCategory = data;
                 if(this.subCategory['product_type']){
                  
                 	 this.pt = this.subCategory['product_type'][0]['id'];
                 		console.log(this.pt);
                 	}
                
			         
			      }

			 	);
      
  }

  fetchProductTypes(){
  	this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  	.catch(err => this.error = err)
  }

  fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
    .catch(error=> this.error = error )
  }

   updateSubCategory(data){
    this.formSubmitAttempt = true;
    // if (this.subCategoryForm.valid){
      console.log(this.subCategoryForm.controls['category'].value);
       this.subCategory['id'] = this.subCategory['id'];
       this.subCategory['category'] = this.subCategoryForm.controls['category'].value;
  	    this.subCategorySrv.updateSubCategory(this.subCategory);
       // }
  }

}
