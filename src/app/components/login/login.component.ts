import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import {UserService} from '../../services/user.service';

declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {
  user : any = {};
  loginForm:FormGroup;
  private formSubmitAttempt: boolean;
  

  constructor(fb: FormBuilder, private userSrv: UserService) {
       let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

  		this.loginForm = fb.group({
  			'email':['', [Validators.required, <any>Validators.pattern(emailRegex)]],
  			'password':['', Validators.required]
  		});
   }

  ngOnInit() {
 
    
  }


  forgotPassword(){
  	
  }

  login(){
   this.formSubmitAttempt = true;
    if (this.user.email, this.user.password){
      this.userSrv.login(this.user.email, this.user.password);
    } 

  }

}
