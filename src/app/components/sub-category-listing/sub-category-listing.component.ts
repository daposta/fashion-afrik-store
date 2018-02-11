import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/product-type.service';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-sub-category-listing',
  templateUrl: './sub-category-listing.component.html',
  styleUrls: ['./sub-category-listing.component.css'],
  providers: [ ProductTypeService, SubCategoryService ]
})
export class SubCategoryListingComponent implements OnInit {
 subs: any[];
  error: any;
  constructor(private productTypeSrv:ProductTypeService, private subCategorySrv: SubCategoryService ) { }

  ngOnInit() {
  	this.fetchSubCategorys()
  }

  fetchSubCategorys(){
  	this.subCategorySrv.fetchSubCategorys().then(response => this.subs = response.results)
  	.catch(err => this.error = err)
  }

}
