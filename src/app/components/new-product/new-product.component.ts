import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import {FileValidator} from '../../validators/file-input.validator'
import { ProductService} from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

declare var $: any;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [ProductService, CategoryService ]
})
export class NewProductComponent implements OnInit {
  
  private formSubmitAttempt: boolean;
  productForm:FormGroup;
  categorys: any[];
  error: any;
  product : any = {};

  constructor(fb: FormBuilder, private productSrv:ProductService, private categorySrv:CategoryService) {
  			this.productForm = fb.group({
  			'name':['', Validators.required],
  			'description':['', Validators.required],
  			'sizes':['', Validators.required],
  			'price':['', Validators.required],
  			'productCategory':['', Validators.required],
        'tags':['', Validators.required],
        'bannerImage':['', ], //[  FileValidator.validate]
        'otherImages':['', ]
      });
   }

  ngOnInit() {

    this.fetchCategorys();
  
  }


  

  fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
    .catch(error=> this.error = error )
  }

  saveProduct(){
  
    this.formSubmitAttempt = true;
     if (this.productForm.valid) {
           // console.log('form submitted');
           this.productSrv.saveProduct(this.product);
        }

  };

  addDocument($event){
  

    let  files = $event.target.files || $event.srcElement.files;
     this.product.bannerImage = files[0];
   

  }


  addOtherDocuments($event){
  

    let  files = $event.target.files || $event.srcElement.files;
      this.product.otherImages = files[0];
   

  }

}
