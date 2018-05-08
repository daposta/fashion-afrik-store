import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';

declare var $: any;

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css'],
  providers: [StoreService]
})
export class MyProfileEditComponent implements OnInit {
  store: any = {};
  editProfileForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(fb: FormBuilder, private storeSrv: StoreService) {
    this.editProfileForm = fb.group({
      'mobile': [''],
      'address': [''],
      'description': [''],
      'storeUserId': [''],
    });
  }

  ngOnInit() {
    let tempStore = localStorage.getItem('store');
    if (tempStore) {
      this.store = JSON.parse(tempStore);
      console.log(this.store);
    }
  }

  // editProfile() {
  //   this.formSubmitAttempt = true;
  //   if (this.store.mobile || this.store.address || this.store.description) {
  //     this.storeSrv.editStore(this.store.mobile, this.store.address, this.store.description, this.store.storeUserId);
  //   }
  // }

  editProfile() {
    let success = <HTMLInputElement>document.getElementById('feedback_success');
    success.innerHTML = '';
    success.style.display = 'None';
    let err = <HTMLInputElement>document.getElementById('feedback_err');
    err.innerHTML = '';
    err.style.display = 'None';

    this.formSubmitAttempt = true;
    if (this.editProfileForm.valid) {
      this.storeSrv.editStore(this.store);
    }

  }

}
