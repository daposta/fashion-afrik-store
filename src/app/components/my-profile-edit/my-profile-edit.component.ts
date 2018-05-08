import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgModule } from '@angular/core';
import { StoreService } from '../../services/store.service';

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

  constructor(fb: FormBuilder, public storeSrv: StoreService) {
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

  editProfile() {
    this.formSubmitAttempt = true;
    if (this.store.mobile || this.store.address || this.store.description) {
      this.storeSrv.editStore(this.store.mobile, this.store.address, this.store.description, this.store.storeUserId);
    }
  }

}
