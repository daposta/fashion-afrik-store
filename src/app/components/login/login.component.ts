import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(fb: FormBuilder) {

  		this.loginForm = fb.group({
  			'email':['', Validators.required]
  		});
   }

  ngOnInit() {
  }


  forgotPassword(){
  	
  }

}
