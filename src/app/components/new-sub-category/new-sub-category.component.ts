import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormArray} from '@angular/forms'
import { ProductTypeService } from '../../services/product-type.service';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-new-sub-category',
  templateUrl: './new-sub-category.component.html',
  styleUrls: ['./new-sub-category.component.css'],
  providers: [ ProductTypeService, SubCategoryService ]
})
export class NewSubCategoryComponent implements OnInit {

  private formSubmitAttempt: boolean;
  subCategoryForm:FormGroup;
  subCategory: any= {};
  items: any[] = [];
  productTypes: any[];
 
  error: any;

  constructor(private fb: FormBuilder, private productTypeSrv:ProductTypeService, private subCategorySrv:SubCategoryService) { 
  	
  }

 

  ngOnInit() {
      this.subCategoryForm = this.fb.group({
        'name':['', Validators.required],
        'productType':['', Validators.required],
       

      });

      this.fetchProductTypes()
  }

   fetchProductTypes(){
  	this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  	.catch(err => this.error = err)
  }

  

  saveCategory(data){
    this.formSubmitAttempt = true;
   
    if (this.subCategoryForm.valid){
  	    this.subCategorySrv.saveSubCategory(data);
       }
  }

}
