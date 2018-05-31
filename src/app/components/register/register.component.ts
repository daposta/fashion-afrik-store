import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {


  user: any = {};
  registrationForm: FormGroup;
  formSubmitAttempt: boolean;
  loading: boolean;
  is_store: boolean = false;
  is_customer: boolean = false;

  constructor(fb: FormBuilder, private userSrv: UserService, private router: Router) {

    this.registrationForm = fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'mobile': ['', Validators.required],
      'email': ['', [Validators.required]],
      'is_store': [''],
      'is_customer': [''],
      'agreedToTerms': ['', Validators.required],
    }, { validator: this.checkPasswords });

  };

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;


    return pass === confirmPass ? null : { notSame: true };

  };

  ngOnInit() {
  }

  register() {
    let success = <HTMLInputElement>document.getElementById('feedback_success');
    success.innerHTML = '';
    success.style.display = 'None';
    let err = <HTMLInputElement>document.getElementById('feedback_err');
    err.innerHTML = '';
    err.style.display = 'None';

    this.formSubmitAttempt = true;
    if (this.registrationForm.valid) {
      this.loading = true;

      this.userSrv.register(this.user)
        .subscribe(res => {
          console.log(res);
          let msg = 'Successful, Login to continue';
          this.loading = false;
          $.toast({
            text: msg,
            position: 'top-center',
            icon: 'success',
            loader: false,
            allowToastClose: false,
            showHideTransition: 'plain',
            hideAfter: 2000
          });
          this.router.navigateByUrl('/login');
        }, err => {
          this.loading = false;
          console.log(err);
          let msg = err.error.message;
          $.toast({
            text: msg,
            position: 'top-center',
            icon: 'error',
            loader: false,
            allowToastClose: false,
            showHideTransition: 'plain',
            hideAfter: 2000
          });
        })
    }

  };

  is_customerChange() {
    this.is_customer = !this.is_customer;
    this.user['is_customer'] = this.is_customer;
    this.is_store = false;
    !this.is_store;
    this.user.is_store = false;
  }

  is_storeChange() {
    this.is_store = !this.is_store;
    this.user['is_store'] = this.is_store;
    this.is_customer = false;
    !this.is_customer;
    this.user.is_customer = false;
  }
}
