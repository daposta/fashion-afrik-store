import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditProfileService } from '../../services/edit-profile.service';
import { StoreService } from '../../services/store.service';
import { Globals } from '../../shared/api';

declare var $: any;

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css'],
  providers: [StoreService, EditProfileService]
})
export class MyProfileEditComponent implements OnInit {
  store: any = {};
  storeData: any = {};
  storeId: any;
  editProfileForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(fb: FormBuilder, private storeSrv: StoreService, private editProfileSrv: EditProfileService) {
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
      this.storeData = JSON.parse(tempStore);
      this.storeId = this.storeData.user;
      console.log(this.storeData);
      console.log(this.storeId);
    }
  }

  editProfile() {
    console.log('profileEdit');
    this.storeId = this.store['id'];
    this.editProfileSrv.updateStoreInfo(this.storeId);
  }

  // editProfile() {
  //   this.formSubmitAttempt = true;
  //   if (this.store.mobile || this.store.address || this.store.description) {
  //     this.storeSrv.editStore(this.store.mobile, this.store.address, this.store.description, this.store.storeUserId);
  //   }
  // }

  // editProfile() {
  //   this.formSubmitAttempt = true;
  //   if (this.editProfileForm.valid) {
  //     this.storeSrv.editStore(this.store);
  //   }
  // }

}
