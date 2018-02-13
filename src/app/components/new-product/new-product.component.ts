import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import {FileValidator} from '../../validators/file-input.validator'
import { ProductService} from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductTypeService } from '../../services/product-type.service';
import { CurrencyService } from '../../services/currency.service';
import { ColorService } from '../../services/color.service';
import { SizeService } from '../../services/size.service';
import { SubCategoryService } from '../../services/sub-category.service';



declare var $: any;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [ProductService, CategoryService , ProductTypeService, CurrencyService,
  ColorService, SizeService, SubCategoryService]
})
export class NewProductComponent implements OnInit {
  
  private formSubmitAttempt: boolean;
  productForm:FormGroup;
  categorys: any[];
   productTypes: any[];
   currencys: any[];
   colors: any[];
   sizes: any[];
    subs: any[];
  error: any;
  product : any = {};
  private clearance: boolean = false;
  private newArrival: boolean = false;

  constructor(fb: FormBuilder, private productSrv:ProductService, private productTypeSrv:ProductTypeService, 
    private categorySrv:CategoryService, private currencySrv: CurrencyService, private colorSrv: ColorService,
    private sizeSrv: SizeService , private subCategorySrv: SubCategoryService) {
  			this.productForm = fb.group({
  			'name':['', Validators.required],
  			'description':['', Validators.required],
  			'sizes':[[''], Validators.required],
        'colors':[[''], Validators.required],
        'otherColors':['', ],
  			'price':['', Validators.required],
  			'productCategory':['', Validators.required],
        'productType':['', Validators.required],
        'subCategory':['', Validators.required],
        'currency':['', Validators.required],
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

    this.currencySrv.fetchCurrencys().then(response => this.currencys = response.results)
    this.colorSrv.fetchColors().then(response => this.colors = response.results)
    this.sizeSrv.fetchSizes().then(response => this.sizes = response.results)
    this.fetchSubCategorys();

  
  }

  clearanceChange(){
    this.clearance = !this.clearance;
    this.product['isClearance'] = this.clearance;
   
  }

  arrivalChange(){
    this.newArrival = !this.newArrival;
    this.product['isNewArrival'] = this.newArrival;
  }


  numbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  

  fetchCategorys(){
    this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
    .catch(error=> this.error = error )
  }

   fetchProductTypes(){
    this.productTypeSrv.fetchProductTypes().then(response =>this.productTypes = response.results  )
    .catch(error=> this.error = error )
  }

   fetchSubCategorys(){
    this.subCategorySrv.fetchSubCategorys().then(response => this.subs = response.results)
    .catch(err => this.error = err)
  }


  saveProduct(){
  
    this.formSubmitAttempt = true;
     if (this.productForm.valid) {
           // console.log('form submitted');
           console.log(this.product);
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
