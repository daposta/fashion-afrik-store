import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormArray} from '@angular/forms'
import { ProductTypeService } from '../../services/product-type.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-type-detail',
  templateUrl: './product-type-detail.component.html',
  styleUrls: ['./product-type-detail.component.css'],
  providers: [ ProductTypeService,CategoryService ]
})
export class ProductTypeDetailComponent implements OnInit {

  private formSubmitAttempt: boolean;
  productTypeForm:FormGroup;
  productType: any= {};
  categorys: any[];
  items: any[] = [];
  error: any;
  category:any;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private productTypeSrv:ProductTypeService,
    private categorySrv:CategoryService) { }

  ngOnInit() {
  	 this.productTypeForm = this.fb.group({
        'name':['', Validators.required],
         'category':['', Validators.required],
        //'subCategories': [],
        

      });
     this.fetchCategorys();
  	 this.route.params.switchMap((params: Params) => 
			 	this.productTypeSrv.findProductTypeByID( params['id']))
			 .subscribe(
			 	data => {
			           this.productType = data;
                 console.log(this.productType['category'][0]['name']);
                 this.category = this.productType['category'][0]['id'];
			         
			         }

			 	);
      
  }

  fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
    .catch(error=> this.error = error )
  }



   updateProductType(data){
    this.formSubmitAttempt = true;
    if (this.productTypeForm.valid){
       this.productType['id'] = this.productType['id'];
  	    this.productTypeSrv.updateProductTypeInfo(this.productType);
       }
  }

}
