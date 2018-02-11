import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
  providers: [ CategoryService ]
})
export class NewCategoryComponent implements OnInit {
  
  private formSubmitAttempt: boolean;
  categoryForm:FormGroup;
  category: any= {};
  // parentCategorys: any[];
  error: any;

  constructor(fb: FormBuilder, private categorySrv:CategoryService) {
  		this.categoryForm = fb.group({
  			'name':['', Validators.required],
  			// 'parent':['']
  		
      });
   }

  ngOnInit() {
  //	this.fetchCategorys();
  }

  //  fetchCategorys(){
  //   this.categorySrv.fetchCategories().then(response =>this.parentCategorys = response.results  )
  //   .catch(error=> this.error = error )
  // }

  saveCategory(){
    this.formSubmitAttempt = true;
    if (this.categoryForm.valid){
  	    this.categorySrv.saveCategory(this.category);
       }
  }

}
