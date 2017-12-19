import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import {FileValidator} from '../../validators/file-input.validator'
import { ProductService} from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductTypeService } from '../../services/product-type.service';


declare var $: any;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [ProductService, CategoryService , ProductTypeService]
})
export class NewProductComponent implements OnInit {
  
  private formSubmitAttempt: boolean;
  productForm:FormGroup;
  categorys: any[];
   productTypes: any[];
  error: any;
  product : any = {};
  private clearance: boolean = false;
  private newArrival: boolean = false;

  constructor(fb: FormBuilder, private productSrv:ProductService, private productTypeSrv:ProductTypeService, 
    private categorySrv:CategoryService) {
  			this.productForm = fb.group({
  			'name':['', Validators.required],
  			'description':['', Validators.required],
  			'sizes':['', Validators.required],
  			'price':['', Validators.required],
  			'productCategory':['', Validators.required],
        'productType':['', Validators.required],
        'tags':['', Validators.required],
        'bannerImage':['', ], //[  FileValidator.validate]
        'otherImages':['', ],
        'isClearance':['', ],
        'isNewArrival':['', ],
        'discountPrice':['', ],
      });
   }

  ngOnInit() {

    this.fetchCategorys();
     this.fetchProductTypes();
    this.product['isNewArrival'] = this.newArrival;
    this.product['isClearance'] = this.clearance;

  
  }

  clearanceChange(){
    this.clearance = !this.clearance;
    this.product['isClearance'] = this.clearance;
   
  }

  arrivalChange(){
    this.newArrival = !this.newArrival;
    this.product['isNewArrival'] = this.newArrival;
  }


  

  fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
    .catch(error=> this.error = error )
  }

   fetchProductTypes(){
    this.productTypeSrv.fetchProductTypes().then(response =>this.productTypes = response.results  )
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
  

    let  files = $event.target.files ;
     this.product.bannerImage = files[0];
    
  }


  addOtherDocuments($event){
  

    let  files = $event.target.files || $event.srcElement.files;
      this.product.otherImages = files;//<Array<File>>(files);
     
   

  }

}
