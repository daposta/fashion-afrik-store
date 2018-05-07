import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css'],
  providers: [UserService]
})
export class MyProfileEditComponent implements OnInit {
  store: any = {};
  editProfileForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(fb: FormBuilder, public userSrv: UserService) {
    this.editProfileForm = fb.group({
      'storeMobile': [''],
      'storeAddress': [''],
      'storeDescription': [''],
    });
  }

  ngOnInit() {
    let tempStore = localStorage.getItem('store');
    if (tempStore) {
      this.store = JSON.parse(tempStore);
      console.log(this.store);
    }
  }

}