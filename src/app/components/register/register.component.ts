import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import {UserService} from '../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  
  user : any = {};
  registrationForm:FormGroup;
  private formSubmitAttempt: boolean;

  constructor(fb: FormBuilder, private userSrv: UserService) {

  	this.registrationForm = fb.group({
  		    'storeName':['', Validators.required],
  			'email':['', [Validators.required]],
  			'password':['', Validators.required],
  			'confirmPassword':['', Validators.required],
  			'address':['', Validators.required],
  		});

   }

  ngOnInit() {
  }

}
