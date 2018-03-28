import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormArray} from '@angular/forms'
import { ProductTypeService } from '../../services/product-type.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-new-sub-category',
  templateUrl: './new-sub-category.component.html',
  styleUrls: ['./new-sub-category.component.css'],
  providers: [ ProductTypeService, SubCategoryService,CategoryService ]
})
export class NewSubCategoryComponent implements OnInit {

  private formSubmitAttempt: boolean;
  subCategoryForm:FormGroup;
  subCategory: any= {};
  items: any[] = [];
  productTypes: any[];
  categorys: any[];
 
  error: any;

  constructor(private fb: FormBuilder, private productTypeSrv:ProductTypeService, private subCategorySrv:SubCategoryService,
    private categorySrv:CategoryService) { 
  	
  }

 

  ngOnInit() {
      this.subCategoryForm = this.fb.group({
        'name':['', Validators.required],
        'productType':['', Validators.required],
        'category':['', Validators.required],
       

      });

     // this.fetchProductTypes();
      this.fetchCategorys();
  }

  //  fetchProductTypes(){
  // 	this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  // 	.catch(err => this.error = err)
  // }

  fetchProductTypeForCategory(event){
    let category = event.target.src;
    this.productTypeSrv.fetchProductTypes(category).then(response => this.productTypes = response.results)
    .catch(err => this.error = err)
  }

   fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
    .catch(error=> this.error = error )
  }

  

  saveCategory(data){
    this.formSubmitAttempt = true;
   
    if (this.subCategoryForm.valid){
  	    this.subCategorySrv.saveSubCategory(data);
       }
  }

}
