import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormArray} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { ProductTypeService } from '../../services/product-type.service';
import { SubCategoryService } from '../../services/sub-category.service';



@Component({
  selector: 'app-sub-category-detail',
  templateUrl: './sub-category-detail.component.html',
  styleUrls: ['./sub-category-detail.component.css'],
  providers: [ ProductTypeService, SubCategoryService ]

})
export class SubCategoryDetailComponent implements OnInit {

  private formSubmitAttempt: boolean;
  productTypeForm:FormGroup;
  subCategory: any= {};
  productTypes: any[];
  items: any[] = [];
  error: any;
  pt:any;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, 
  	private productTypeSrv:ProductTypeService, private subCategorySrv:SubCategoryService) { }

   ngOnInit() {
  	 this.productTypeForm = this.fb.group({
        'name':['', Validators.required],
         'productType':['', Validators.required],
        //'subCategories': [],
        

      });
       this.fetchProductTypes();
       console.log('pppppppp');
       console.log(this.productTypes);

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



   updateSubCategory(data){
    this.formSubmitAttempt = true;
    if (this.productTypeForm.valid){
       this.subCategory['id'] = this.subCategory['id'];
  	    this.subCategorySrv.updateSubCategory(this.subCategory);
       }
  }

}
