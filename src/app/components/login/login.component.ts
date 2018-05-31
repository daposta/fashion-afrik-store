import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {
  user: any = {};
  loginForm: FormGroup;
  emailRequired: string = 'Email is required';
  emailInvalid: string = 'Email is invalid';
  passwordRequired: string = 'Password is required';
  formSubmitAttempt: boolean;
  loading: boolean;


  constructor(fb: FormBuilder, private userSrv: UserService, private router: Router) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.loginForm = fb.group({
      'email': ['', [Validators.required, <any>Validators.pattern(emailRegex)]],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {


  }


  forgotPassword() {

  }

  login() {
    if (this.user.email, this.user.password) {
      this.loading = true;
      this.userSrv.login(this.user.email, this.user.password)
        .subscribe(res => {
          let data = res;
          // console.log(res.data.user);
          // console.log(res.data.store);
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('store', JSON.stringify(res.data.store));

          if (res.data.store == null || undefined) {
            this.loading = false;
            this.router.navigateByUrl('/store-profile');
          } else if (res.data.store !== null || undefined) {
            this.loading = false;
            window.location.href = '/';
          } else {
            this.loading = false;
            this.router.navigateByUrl('/login');
          }
        }, err => {
          // let msg = err.error.message;
          console.log(err);
          this.loading = false;
          let msg = err.error.message;
          $.toast({
            text: msg,
            position: 'top-center',
            icon: 'error',
            loader: false,
            allowToastClose: false,
            showHideTransition: 'plain',
            hideAfter: 2000
          })
        })

    }
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };
}
