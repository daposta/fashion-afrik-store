import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [UserService]
})
export class ChangePasswordComponent implements OnInit {
  newPassword: any = {};
  resetPasswordForm: FormGroup;
  formSubmitAttempt: boolean;
  loading: boolean;

  constructor(fb: FormBuilder, private userSrv: UserService, private router: Router) {
    this.resetPasswordForm = fb.group({
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
    }, { validator: this.checkPasswords });
  };

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  resetPassword() {
    this.formSubmitAttempt = true;
    if(this.resetPasswordForm.valid) {
      this.loading = true;

      this.userSrv.resetPassword(this.newPassword.password)
        .subscribe(res => {
          this.loading = false;
          console.log(res);
          $.toast({
            text: 'Password Changed',
            position: 'top-center',
            icon: 'success',
            showHideTransition: 'slide',
          })
          this.router.navigateByUrl('/my-profile');
        }, err => {
          this.loading = false;
          console.log(err);
        })
    }
  }

  ngOnInit() {
  }

}
