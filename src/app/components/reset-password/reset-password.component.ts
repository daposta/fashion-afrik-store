import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UserService]
})
export class ResetPasswordComponent implements OnInit {
  store: any = {};
  resetPasswordForm: FormGroup;
  private formSubmitAttempt: boolean;
  
  // oldPasswordRequired: string = 'Password is required';
  // newPasswordRequired: string = 'Set a new password'
  // confirmNewPasswordRequired: string = 'Confirm new password';
  // newPasswordMismatch: string = 'Password mismatch';

  constructor(fb: FormBuilder, private userSrv: UserService) {
    this.resetPasswordForm = fb.group({
      'oldPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required],
    }, { validator: this.checkPasswords });
  };

  checkPasswords(group: FormGroup) {
    let pass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmNewPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  ngOnInit() {
  }

  resetPassword() {
    // let success = <HTMLInputElement>document.getElementById('feedback_success');
    // success.innerHTML = '';
    // success.style.display = 'None';
    // let err = <HTMLInputElement>document.getElementById('feedback_err');
    // err.innerHTML = '';
    // err.style.display = 'None';

    this.formSubmitAttempt = true;
    if(this.resetPasswordForm.valid) {
      console.log('success');
    }
  }

}
