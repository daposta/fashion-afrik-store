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
       let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

  		this.loginForm = fb.group({
  			'email':['', [Validators.required, <any>Validators.pattern(emailRegex)]],
  			'password':['', Validators.required]
  		});
   }

  ngOnInit() {
     document.body.classList.add("login-page");
    
  }


  forgotPassword(){
  	
  }

  login(){

  }

}
