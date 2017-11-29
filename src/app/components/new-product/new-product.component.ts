import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import {FileValidator} from '../../validators/file-input.validator'

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  
  productForm:FormGroup;

  constructor(fb: FormBuilder) {
  			this.productForm = fb.group({
  			'name':['', Validators.required],
  			'description':['', Validators.required],
  			'sizes':['', Validators.required],
  			'price':['', Validators.required],
  			'category':['', Validators.required],
        'banner_image':['', [Validators.required,  FileValidator.validate]]
      });
   }

  ngOnInit() {

  
  }

  saveProduct(){

  }

}
