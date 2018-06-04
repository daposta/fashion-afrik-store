import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditProfileService } from '../../services/edit-profile.service';
import { StoreService } from '../../services/store.service';
import { Globals } from '../../shared/api';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css'],
  providers: [StoreService, EditProfileService]
})
export class MyProfileEditComponent implements OnInit {
  storeData: any = {};
  userData: any = {};
  storeId: any;
  editProfileForm: FormGroup;
  formSubmitAttempt: boolean;
  loading: boolean;
  storeProfile: any = {};

  constructor(fb: FormBuilder, private storeSrv: StoreService, private editProfileSrv: EditProfileService, private router: Router) {
    this.editProfileForm = fb.group({
      'name': [''],
      'storeId': [''],
      'mobile': [''],
      'address': [''],
      'description': [''],
    });
  }

  ngOnInit() {
    let tempStore = localStorage.getItem('store');
    if (tempStore) {
      this.storeData = JSON.parse(tempStore);
      this.storeId = this.storeData.user;
    };

    let tempUser = localStorage.getItem('user');
    if (tempUser) {
      this.userData = JSON.parse(tempUser);
    }

    this.editProfileForm.patchValue({
      'name': this.storeData.name,
      'storeId': this.storeData.id,
      'mobile': this.userData.mobile,
    })
  }

  editProfile() {
    // console.log(this.storeData.id)
    this.formSubmitAttempt = true;
    // console.log(this.editProfileForm.value);
    this.loading = true;

    this.storeSrv.editStoreProfile(this.editProfileForm.value)
      .subscribe(res => {
        this.loading = false;
        // console.log(res);
        localStorage.setItem('store', JSON.stringify(res));

        $.toast({
          text: 'Store update successfull',
          position: 'top-center',
          icon: 'success',
          loader: false,
          allowToastClose: false,
          showHideTransition: 'plain',
          hideAfter: 2000
        })
        this.router.navigateByUrl('/my-profile');
      }, err => {
        this.loading = false;
        console.log(err);

        $.toast({
          text: 'Store update failed',
          position: 'top-center',
          icon: 'error',
          loader: false,
          allowToastClose: false,
          showHideTransition: 'plain',
          hideAfter: 2000
        })
      })
    this.loading = false;
  }
}
