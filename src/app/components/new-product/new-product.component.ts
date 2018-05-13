import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FileValidator } from '../../validators/file-input.validator'
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductTypeService } from '../../services/product-type.service';
import { CurrencyService } from '../../services/currency.service';
import { ColorService } from '../../services/color.service';
import { SizeService } from '../../services/size.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { Router } from '@angular/router';



declare var $: any;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [ProductService, CategoryService, ProductTypeService, CurrencyService,
    ColorService, SizeService, SubCategoryService]
})

export class NewProductComponent implements OnInit {

  private formSubmitAttempt: boolean;
  productForm: FormGroup;
  categorys: any[];
  productTypes: any[];
  currencys: any[];
  colors: any[];
  sizes: any[];
  subs: any[];
  error: any;
  product: any = {};
  private clearance: boolean = false;
  private newArrival: boolean = false;
  category: any = {};
  productType: any = {};
  subCategory: any = {};
  newSubCategory: any[];
  newSubCategorys: any[];
  newProductType: any[];
  product_type: any;
  private loading: boolean;

  constructor(fb: FormBuilder, private productSrv: ProductService, private productTypeSrv: ProductTypeService,
    private categorySrv: CategoryService, private currencySrv: CurrencyService, private colorSrv: ColorService,
    private sizeSrv: SizeService, private subCategorySrv: SubCategoryService, private router: Router) {
    this.productForm = fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'sizes': [[''], Validators.required],
      'colors': [[''], Validators.required],
      'otherColors': ['',],
      'price': ['', Validators.required],
      'productCategory': ['', Validators.required],
      'productType': ['', Validators.required],
      'subCategory': ['', Validators.required],
      'currency': ['', Validators.required],
      'tags': ['', Validators.required],
      'bannerImage': ['',],
      'otherImages': ['',],
      'isClearance': ['',],
      'isNewArrival': ['',],
      'discountPrice': ['',],
    });
  }

  ngOnInit() {

    this.fetchCategorys();
    this.fetchProductTypes();
    this.product['isNewArrival'] = this.newArrival;
    this.product['isClearance'] = this.clearance;

    //fetchCurrencys
    this.currencySrv.fetchCurrencys().then((response: any) => {
      this.currencys = response;
      // console.log(this.currencys);
    })
      .catch(error => this.error = error);

    //fetchColors
    this.colorSrv.fetchColors().then((response: any) => {
      this.colors = response;
      // console.log(this.colors);
    })
      .catch(error => this.error = error);

    //fetchSize
    this.sizeSrv.fetchSizes().then((response: any) => {
      this.sizes = response;
      // console.log(this.sizes);
    })
      .catch(error => this.error = error);

    this.fetchSubCategorys();
  }

  ngAfterViewInit() {
    $('.single-file').filer();
    $('.multi-file').filer();
  }

  clearanceChange() {
    this.clearance = !this.clearance;
    this.product['isClearance'] = this.clearance;

  }

  arrivalChange() {
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

  // fetchCategorys(){
  //   this.categorySrv.fetchCategories().then(response =>this.categorys = response.results  )
  //   .catch(error=> this.error = error )
  //   console.log(this.categorys);
  // }

  fetchCategorys() {
    this.categorySrv.fetchCategories().then((response: any) => {
      this.categorys = response;
      // console.log(this.categorys);
    })
      .catch(error => this.error = error)
  }

  // fetchProductTypes() {
  //   this.productTypeSrv.fetchProductTypes().then(response => this.productTypes = response.results)
  //     .catch(error => this.error = error)
  // }

  fetchProductTypes() {
    this.productTypeSrv.fetchProductTypes().then((response: any) => {
      this.productTypes = response;
      // console.log(this.productTypes);
    })
      .catch(error => this.error = error)
  }

  // fetchSubCategorys() {
  //   this.subCategorySrv.fetchSubCategorys().then(response => this.subs = response.results)
  //     .catch(err => this.error = err)
  // }

  fetchSubCategorys() {
    this.subCategorySrv.fetchSubCategorys().then((response: any) => {
      this.subs = response;
      // console.log(this.subs);
    })
      .catch(error => this.error = error)
  }

  saveProduct() {

    this.formSubmitAttempt = true;
    if (this.productForm.valid) {
      this.loading = true;
      this.productSrv.saveProduct(this.product).subscribe(
        res => {
          console.log(res);
          // let msg = JSON.parse(res['_body'])['message'];
          // console.log(msg);
          // console.log(res['_body']);
          $.toast({
            text: res,
            position: 'top-center',
            icon: 'success',
            showHideTransition: 'slide',
          });
          this.loading = false;
          this.router.navigateByUrl('/products');
        },
        error => {
          this.loading = false;
          console.log(error);
          // let msg = JSON.parse(error._body)['message'];
          // console.log(msg);
          $.toast({
            text: error.error.message,
            position: 'top-center',
            icon: 'error',
            loader: false,
            showHideTransition: 'plain',
            allowToastClose: false,
            hideAfter: 2000
          });
        })
    }

    // this.http.post(this.productsUrl, formData, { headers }).subscribe(
    //         res => {
    //             console.log(formData);
    //             let msg = JSON.parse(res['_body'])['message'];
    //             console.log(msg);
    //             console.log(res['_body']);
    //             $.toast({
    //                 text: msg,
    //                 position: 'top-center',
    //                 icon: 'success',
    //                 showHideTransition: 'slide',
    //             });

    //             this.router.navigateByUrl('products');
    //         },
    //         error => {

    //             console.log(error._body);
    //             let msg = JSON.parse(error._body)['message'];
    //             console.log(msg);
    //             $.toast({
    //                 text: msg,
    //                 position: 'top-center',
    //                 icon: 'error',
    //                 loader: false,
    //                 showHideTransition: 'plain',
    //                 allowToastClose: false,
    //                 hideAfter: 2000
    //             });
    //         })

  };

  addDocument($event) {
    let files = $event.target.files;
    this.product.bannerImage = files[0];

  }

  addOtherDocuments($event) {
    let files = $event.target.files || $event.srcElement.files;
    this.product.otherImages = files;//<Array<File>>(files);
  }

  changed(value) {
    var cat = this.categorys.filter(data => data.slug == value);
    this.newProductType = cat[0].product_types;
  }

  changedProduct(value) {
    this.newSubCategorys = [];
    let newSubCAt = [];
    var product = this.newProductType.filter(data => data.slug == value);
    var subCat = product[0].sub_categorys;
    for (var j = 0; j < subCat.length; j++) {
      newSubCAt.push(subCat[j]);
      // console.log(newSubCAt);
    }
    this.newSubCategorys = newSubCAt;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

}
