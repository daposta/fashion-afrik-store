import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot: any = {};
  forgotForm: FormGroup;
  emailRequired: string = 'Email is required';
  emailInvalid: string = 'Email is invalid';
  private formSubmitAttempt: boolean;

  constructor(fb: FormBuilder) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    
    this.forgotForm = fb.group({
      'email': ['', [Validators.required, <any>Validators.pattern(emailRegex)]],
    })
  }

  ngOnInit() {
  }

  requestLink() {
    this.formSubmitAttempt = true;
    if(this.forgot.email) {
      // console.log(this.forgot.email);
    }
  }

}
