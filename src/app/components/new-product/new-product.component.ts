import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FileValidator } from '../../validators/file-input.validator'
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductTypeService } from '../../services/product-type.service';
import { CurrencyService } from '../../services/currency.service';
import { ColorService } from '../../services/color.service';
import { TagsService } from '../../services/tags.service';
import { SizeService } from '../../services/size.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { Router } from '@angular/router';



declare var $: any;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [ProductService, CategoryService, ProductTypeService, CurrencyService,
    ColorService, SizeService, SubCategoryService, TagsService]
})

export class NewProductComponent implements OnInit {

  formSubmitAttempt: boolean;
  productForm: FormGroup;
  categorys: any;
  productTypes: any[];
  currencys: any[];
  tags: any[];
  colors: any[];
  sizes: any[];
  subs: any[];
  error: any;
  product: any = {};
  clearance: boolean = false;
  newArrival: boolean = false;
  category: any = {};
  productType: any;
  subCategory: any[];
  newSubCategory: any[];
  newSubCategorys: any[];
  newProductType: any[];
  product_type: any;
  loading: boolean;

  constructor(fb: FormBuilder, private productSrv: ProductService, private productTypeSrv: ProductTypeService,
    private categorySrv: CategoryService, private currencySrv: CurrencyService, private colorSrv: ColorService,
    private sizeSrv: SizeService, private subCategorySrv: SubCategoryService, private router: Router, private tagsSrv: TagsService) {
    this.productForm = fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'sizes': [[''], Validators.required],
      'colors': [[''], Validators.required],
      'otherColors': ['',],
      'price': ['', Validators.required],
      'l1category': ['', Validators.required],
      'l2category': ['', Validators.required],
      'l3category': ['', Validators.required],
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
    this.fetchTags();
    this.fetchCurrencys();
    this.fetchColors();
    this.fetchSize();
    this.product['isNewArrival'] = this.newArrival;
    this.product['isClearance'] = this.clearance;
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

  fetchCategorys() {
    this.categorySrv.fetchCategories()
      .subscribe(res => {
        this.categorys = res;
      }, err => {
        console.log(err);
      })
  }

  fetchTags() {
    this.tagsSrv.fetchTags().subscribe(
      res => {
        this.tags = res;
      }, err => {
        console.log(err);
      }
    )
  }

  fetchCurrencys() {
    this.currencySrv.fetchCurrencys().subscribe((res: any) => {
      this.currencys = res;
    }, err => {
      console.log(err);
    })
  }

  fetchColors() {
    this.colorSrv.fetchColors().subscribe((res: any) => {
      this.colors = res;
    }, err => {
      console.log(err);
    })
  }

  fetchSize() {
    this.sizeSrv.fetchSizes().subscribe((res: any) => {
      this.sizes = res;
    }, err => {
      console.log(err);
    })
  }

  saveProduct() {
    this.formSubmitAttempt = true;
    if (this.productForm.valid) {
      this.loading = true;
      this.productSrv.saveProduct(this.product).subscribe(
        res => {
          $.toast({
            text: res,
            position: 'top-center',
            icon: 'success',
            loader: false,
            showHideTransition: 'plain',
            allowToastClose: false,
            hideAfter: 2000,
          });
          this.loading = false;
          this.router.navigateByUrl('/products');
        },
        err => {
          this.loading = false;
          console.log(err);
          $.toast({
            text: err.error.message,
            position: 'top-center',
            icon: 'error',
            loader: false,
            showHideTransition: 'plain',
            allowToastClose: false,
            hideAfter: 2000
          });
        })
    }
  };

  addDocument($event) {
    let files = $event.target.files;
    this.product.bannerImage = files[0];
  }

  addOtherDocuments($event) {
    let files = $event.target.files || $event.srcElement.files;
    this.product.otherImages = files;
  }

  fetchProductTypeForCategory(event) {
    this.category = event.target.value;
    this.productForm.patchValue({ 'l2category': '', 'l3category': '' })
    this.categorySrv.fetchProductTypesParam(this.category)
      .subscribe(res => {
        this.productTypes = res;
      }, err => {
        console.log(err);
      })
  }

  fetchSubCatForTypes(event) {
    this.productType = event.target.value;
    let productType = this.productType;
    let category = this.category
    this.categorySrv.fetchSubCatTypesParam(productType, category)
      .subscribe(res => {
        this.subCategory = res;
      }, err => {
        console.log(err);

      })
  }

}
