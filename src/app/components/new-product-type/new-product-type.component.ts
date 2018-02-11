import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormArray} from '@angular/forms'
import { ProductTypeService } from '../../services/product-type.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-new-product-type',
  templateUrl: './new-product-type.component.html',
  styleUrls: ['./new-product-type.component.css'],
  providers: [ ProductTypeService, CategoryService ]

})
export class NewProductTypeComponent implements OnInit {
  

  private formSubmitAttempt: boolean;
  productTypeForm:FormGroup;
  productType: any= {};
  items: any[] = [];
  parentCategorys: any[];
 
  error: any;

  constructor(private fb: FormBuilder, private productTypeSrv:ProductTypeService, private categorySrv:CategoryService) { 
  	
  }

 

  ngOnInit() {
      this.productTypeForm = this.fb.group({
        'name':['', Validators.required],
        'category':['', Validators.required],
        // 'items': this.fb.array([ this.createItem() ]),
        // 'categorys': this.fb.array([
        //         this.initProductTypeCategory(),
        //     ])

      });

      this.fetchCategorys();
  }

   fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.parentCategorys = response.results  )
    .catch(error=> this.error = error )
  }

  

  saveCategory(data){
    this.formSubmitAttempt = true;
   
    if (this.productTypeForm.valid){
  	    this.productTypeSrv.saveProductType(data);
       }
  }

}
