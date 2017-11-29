import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(fb: FormBuilder) {

  		this.loginForm = fb.group({
  			'email':['', Validators.required],
  			'password':['', Validators.required]
  		});
   }

  ngOnInit() {
     document.body.classList.add("skin-black");
     document.body.classList.add("sidebar-mini");
  }


  forgotPassword(){
  	
  }

}
