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
  
  
  store : any = {};
  registrationForm:FormGroup;
  private formSubmitAttempt: boolean;

  constructor(fb: FormBuilder, private userSrv: UserService) {

  	this.registrationForm = fb.group({
  		  'storeName':['', Validators.required],
        'description':['', Validators.required],
        'mobile':['', Validators.required],
  			'email':['', [Validators.required]],
  			'password':['', Validators.required],
  			'confirmPassword':['', Validators.required],
  			'agreedToTerms':['', Validators.required],
  		}, {validator: this.checkPasswords});

   };

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmPassword.value;

  
      return pass === confirmPass ? null : { notSame: true }    ;
      
    };

  ngOnInit() {
  }

  register(){
    let success = <HTMLInputElement>document.getElementById('feedback_success');
    success.innerHTML = '';
    success.style.display= 'None';
    let err = <HTMLInputElement>document.getElementById('feedback_err');
    err.innerHTML = '';
    err.style.display= 'None';

    this.formSubmitAttempt = true;
     if (this.registrationForm.valid) {
         
            this.userSrv.register(this.store);
           //this.productSrv.saveProduct(this.product);
        }

  }

}
