import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UserService]
})
export class ResetPasswordComponent implements OnInit {
  store: any = {};
  checkPasswordForm: FormGroup;
  formSubmitAttempt: boolean;
  loading: boolean;

  constructor(fb: FormBuilder, private userSrv: UserService, private router: Router) {
    this.checkPasswordForm = fb.group({
      'password': ['', Validators.required],
    });
  };

  ngOnInit() {
  }

  checkPassword() {
    this.formSubmitAttempt = true;
    if (this.store.password) {
      this.loading = true;
      this.userSrv.checkPassword(this.store.password)
        .subscribe(res => {
          this.loading = false;
          // console.log(res.valid);
          if (res.valid === true) {
            $.toast({
              text: 'Password check successful',
              position: 'top-center',
              icon: 'success',
              showHideTransition: 'slide',
            })
            this.router.navigateByUrl('/change-password');
          } else {
            $.toast({
              text: 'Password check failed',
              position: 'top-center',
              icon: 'error',
              showHideTransition: 'slide',
            });
          }

        }, err => {
          this.loading = false;
          console.log(err);
        })
    }
  }

}
