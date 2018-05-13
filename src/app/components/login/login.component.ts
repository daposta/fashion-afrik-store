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
  private formSubmitAttempt: boolean;
  private loading: boolean;


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
          console.log(res)

          if (data.token) {
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            this.loading = false;
            window.location.href = '/';
          }
          else {
            this.loading = false;
            this.router.navigateByUrl('/login');
          }

        }, err => {
          let msg = err.error.message;
          this.loading = false;
          $.toast({
            text: msg,
            position: 'top-center',
            'icon': 'error'
          })
        })

    }
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };
}
