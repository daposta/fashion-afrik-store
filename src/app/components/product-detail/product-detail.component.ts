import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductTypeService } from '../../services/product-type.service';
import { CurrencyService } from '../../services/currency.service';
import { ColorService } from '../../services/color.service';
import { SizeService } from '../../services/size.service';
import { TagsService } from '../../services/tags.service'
import { SubCategoryService } from '../../services/sub-category.service';
import { FindProductByIdService } from '../../services/find-product-by-id.service';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var $: any;


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, CategoryService, ProductTypeService, CurrencyService,
    ColorService, SizeService, SubCategoryService, FindProductByIdService, TagsService]
})
export class ProductDetailComponent implements OnInit {

  product: Object = {};
  // productInfo: any = {};
  // new_product: Object = {};
  new_product: any = {};
  host_address: string = this.globals.HOST_URL;
  categorys: any[];
  category: any = {};
  productType: any;
  subCategory: any[];
  productTypes: any[];
  currencys: any[];
  colors: any[];
  sizes: any[];
  tags: any[];
  subs: any[];
  error: any;
  formSubmitAttempt: boolean;
  loading: boolean;
  productForm: FormGroup;
  banner_image: string;
  allOther_images: string[] = [];
  allColors: any[] = [{}];
  changedInputs = [];
  dirtyValues = {};
  clearance: boolean = false;
  newArrival: boolean = false;

  constructor(private productSrv: ProductService, private route: ActivatedRoute, private globals: Globals,
    private categorySrv: CategoryService, private productTypeSrv: ProductTypeService, fb: FormBuilder,
    private currencySrv: CurrencyService, private colorSrv: ColorService,
    private sizeSrv: SizeService, private subCategorySrv: SubCategoryService, private findProductByIdSrv: FindProductByIdService, private tagsSrv: TagsService, private router: Router) {
    this.productForm = fb.group({
      'id': [''],
      'name': [''],
      'description': [''],
      'sizes': [['']],
      'colors': [['']],
      'otherColors': [''],
      'store_price': [''],
      'productCategory': [''],
      'productType': [''],
      'subCategory': [''],
      'currency': [''],
      'tags': [''],
      'is_clearance': [''],
      'is_new_arrival': [''],
      'discount_price': [''],

    });
  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) =>
      this.findProductByIdSrv.findProductByUUID(params['id']))
      .subscribe(product => this.onStoreRetrieved(product)),
      (error => console.log(error))


    // this.route.params.switchMap((params: Params) =>
    //   this.findProductByIdSrv.findProductByUUID(params['id']))
    //   .subscribe(
    //     data => {
    //       this.product = data;
    //       console.log(this.product);
    //       let tags_temp = '';
    //       data.tags.forEach(item => {

    //         tags_temp += item.name + ', ';
    //       });

    //       data.other_images.forEach(item => {
    //         this.allOther_images.push(item.image);
    //       })

    //       this.product['tags_temp'] = tags_temp;

    //       let other_colors_temp = '';
    //       data.mixed_colors.forEach(item => {

    //         other_colors_temp += item.name + ', ';
    //       });

    //       this.product['other_colors_temp'] = other_colors_temp;

    //       let colors_list = [];
    //       data.colors.forEach(function (item: any) {
    //         colors_list.push(item.id);
    //       });
    //       this.product['colors_list'] = colors_list;
    //       //set category as selected

    //       this.banner_image = data.banner_image;
    //       // this.product['category'] = data.category? data.category.id : null;
    //       //  this.product['product_ty'] = data.category? data.category.id : null;
    //       // this.feature_image = this.globals.HOST_URL + this.feature_image;

    //     }

    //   );

    this.fetchCategorys();
    this.fetchProductTypes();
    this.fetchSubCategorys();
    this.fetchCurrencies();
    this.fetchColors();
    this.fetchSizes();
    this.fetchTags();
  };

  onStoreRetrieved(product) {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;
    // console.log(product);
    product.other_images.forEach(item => {
      this.allOther_images.push(item.image);
    });

    this.productForm.patchValue({
      'id': product.id,
      'name': product.name,
      'description': product.description,
      'store_price': product.store_price,
      'discount_price': product.discount_price,
      'currency': product.currency.code,
      'is_clearance': product.is_clearance,
      'is_new_arrival': product.is_new_arrival,
    })
  }

  fetchCurrencies() {
    this.currencySrv.fetchCurrencys().subscribe((res: any) => {
      this.currencys = res.data;
      // console.log(this.currencys);
    }, err => {
      console.log(err);
    })
  }

  fetchColors() {
    this.colorSrv.fetchColors().subscribe((res: any) => {
      this.colors = res.data;
      // console.log(this.colors);
    }, err => {
      console.log(err);
    })
  }

  fetchSizes() {
    this.sizeSrv.fetchSizes().subscribe((res: any) => {
      this.sizes = res.data;
      // console.log(this.sizes);
    }, err => {
      console.log(err);
    })
  }

  fetchTags() {
    this.tagsSrv.fetchTags().subscribe((res: any) => {
      this.tags = res.data;
      // console.log(this.tags);
    }, err => {
      console.log(err);
    })
  }

  fetchCategorys() {
    this.categorySrv.fetchCategories().subscribe((res: any) => {
      this.categorys = res.data;
      // console.log(this.categorys);
    }, err => {
      console.log(err);
    })
  }

  fetchProductTypes() {
    this.productTypeSrv.fetchProductTypes().subscribe((res: any) => {
      this.productTypes = res.data;
      // console.log(this.productTypes);
    }, err => {
      console.log(err);
    })
  }

  fetchSubCategorys() {
    this.subCategorySrv.fetchSubCategorys().subscribe((res: any) => {
      this.subs = res.data;
      // console.log(this.subs);
    }, err => {
      console.log(err);
    })
  }

  checkColorSelected(color) {
    if (this.product['colors']) {
      return this.product['colors'].findIndex(selUser => selUser.name === color) > -1;
    }
  }

  checkSizeSelected(size) {
    if (this.product['sizes']) {
      return this.product['sizes'].findIndex(selUser => selUser.name === size) > -1;
    }
  }

  checkTagSelected(tag) {
    if (this.product['tags']) {
      return this.product['tags'].findIndex(selUser => selUser.name === tag) > -1;
    }
  }

  fetchProductTypeForCategory(event) {
    this.category = event.target.value;
    // console.log(this.category);
    this.productForm.patchValue({ 'productType': '', 'subCategory': '' })
    this.categorySrv.fetchProductTypesParam(this.category)
      .subscribe(res => {
        this.productTypes = res.data;
        // console.log(this.productTypes);
      }, err => {
        console.log(err);
      })
  }

  fetchSubCatForTypes(event) {
    this.productType = event.target.value;
    let productType = this.productType;
    let category = this.category
    // console.log(productType);
    // console.log(category);
    this.productForm.patchValue({ 'subCategory': '' })
    this.categorySrv.fetchSubCatTypesParam(productType, category)
      .subscribe(res => {
        this.subs = res.data;
        // console.log(this.subs);
      }, err => {
        console.log(err);

      })
  }

  getDirtyValues(form: any) {

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            this.dirtyValues[key] = this.getDirtyValues(currentControl);
          else
            this.dirtyValues[key] = currentControl.value;
        }
      });
    // console.log(this.dirtyValues)
    return this.dirtyValues;
  }

  updateProduct() {
    this.formSubmitAttempt = true;
    this.loading = true;
    this.getDirtyValues(this.productForm);

    this.productSrv.updateProduct(this.new_product, this.dirtyValues)
      .subscribe(res => {
        $.toast({
          text: 'Update successful',
          position: 'top-center',
          icon: 'success',
          loader: false,
          showHideTransition: 'plain',
          allowToastClose: false,
          hideAfter: 2000,
        });
        this.loading = false;
      }, err => {
        this.loading = false;
        console.log(err);
        $.toast({
          text: 'Update failed',
          position: 'top-center',
          icon: 'error',
          loader: false,
          showHideTransition: 'plain',
          allowToastClose: false,
          hideAfter: 2000
        });
      })
  }

  clearanceChange() {
    this.clearance = !this.clearance;
    this.product['isClearance'] = this.clearance;

  }

  arrivalChange() {
    this.newArrival = !this.newArrival;
    this.product['isNewArrival'] = this.newArrival;
  }


  // removeOtherImages(productID) {
  //   console.log(productID);
  //   alert('remove other');
  // };


  // removeBannerImage(productID) {
  //   console.log(productID);
  //   alert('remove banner');
  // };


  // addOtherImages() {
  //   alert('add other');

  // };




  // addBannerImage() {
  //   alert('add banner image');

  // };







}
