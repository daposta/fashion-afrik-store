import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css'],
  providers: [ CategoryService ]
})
export class CategoryListingComponent implements OnInit {

  categorys: any[];
  error: any;

  constructor(private categorySrv:CategoryService) { }

  ngOnInit() {
  	this.fetchCategorys()
  }

  fetchCategorys(){
  	this.categorySrv.fetchCategories().then(response => this.categorys = response.results)
  	.catch(err => this.error = err)
  }

}
