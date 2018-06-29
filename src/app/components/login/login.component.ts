import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {
  emailRequired: string = 'Email is required';
  emailInvalid: string = 'Email is invalid';
  passwordRequired: string = 'Password is required';
  passwordMinLength: string = 'Password min length 6 characters';
  user: any = {};
  loginForm: FormGroup;
  formSubmitAttempt: boolean;
  loading: boolean;


  constructor(fb: FormBuilder, private userSrv: UserService, private router: Router, private toastr: ToastrService) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.loginForm = fb.group({
      // 'email': ['', [Validators.required, Validators.email]],
      'email': ['', [Validators.required, Validators.pattern(emailRegex)]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

  }


  forgotPassword() {

  }

  login() {
    this.formSubmitAttempt = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.userSrv.login(this.user.email, this.user.password)
        .subscribe(res => {
          // let data = res;
          // console.log(res.data.user);
          // console.log(res.data.store);
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('store', JSON.stringify(res.data.store));

          if (res.data.store == null || undefined) {
            this.loading = false;
            this.router.navigateByUrl('/store-profile');
            this.toastr.success('Create store profile to continue');
            // $.toast({
            //   text: 'Create store profile to continue',
            //   position: 'top-center',
            //   icon: 'success',
            //   loader: false,
            //   allowToastClose: false,
            //   showHideTransition: 'plain',
            //   hideAfter: 2000,
            // })
          } else if (res.data.store !== null || undefined) {
            this.loading = false;
            window.location.href = '/';
          } else {
            this.loading = false;
            this.router.navigateByUrl('/login');
            this.toastr.error('Oops...Please try again!')
            // $.toast({
            //   text: 'Oops...Please try again',
            //   position: 'top-center',
            //   icon: 'success',
            //   loader: false,
            //   allowToastClose: false,
            //   showHideTransition: 'plain',
            //   hideAfter: 2000,
            // })
          }
        }, err => {
          console.log(err);
          this.loading = false;
          let msg = err.error.message;
          this.toastr.error(msg);
          // $.toast({
          //   text: msg,
          //   position: 'top-center',
          //   icon: 'error',
          //   loader: false,
          //   allowToastClose: false,
          //   showHideTransition: 'plain',
          //   hideAfter: 2000
          // })
        })

    }
  }

}
