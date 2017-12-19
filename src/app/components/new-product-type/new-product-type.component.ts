import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ProductTypeService } from '../../services/product-type.service';

@Component({
  selector: 'app-new-product-type',
  templateUrl: './new-product-type.component.html',
  styleUrls: ['./new-product-type.component.css'],
  providers: [ ProductTypeService ]

})
export class NewProductTypeComponent implements OnInit {
  

  private formSubmitAttempt: boolean;
  productTypeForm:FormGroup;
  productType: any= {};
 
  error: any;

  constructor(fb: FormBuilder, private productTypeSrv:ProductTypeService) { 
  		this.productTypeForm = fb.group({
  			'name':['', Validators.required],
  			
  		
      });
  }

  ngOnInit() {
  }

  saveCategory(){
    this.formSubmitAttempt = true;
    if (this.productTypeForm.valid){
  	    this.productTypeSrv.saveProductType(this.productType);
       }
  }

}
