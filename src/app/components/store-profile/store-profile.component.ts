import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.css'],
  providers: [StoreService]
})
export class StoreProfileComponent implements OnInit {

  storeProfile: any = {};
  userData: any = {};
  userId: any;
  createStoreForm: FormGroup;
  formSubmitAttempt: boolean;
  loading: boolean;
  // user: string = this.userId;

  constructor(fb: FormBuilder, private storeSrv: StoreService, private router: Router) {
    this.createStoreForm = fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'address': ['', Validators.required],
      'user': ['', Validators.required]
    });
  }

  ngOnInit() {
    let tempUser = localStorage.getItem('user');
    if (tempUser) {
      this.userData = JSON.parse(tempUser);
      this.userId = this.userData.id;
      // console.log(this.userId);
      // console.log(this.userData)
    };

    this.createStoreForm.patchValue({
      'user': this.userId,
    });

  }

  createStore() {
    this.formSubmitAttempt = true;
    // console.log(this.createStoreForm.value);
    if (this.createStoreForm.valid) {
      this.loading = true;
      // console.log(this.storeProfile);

      this.storeSrv.createStore(this.createStoreForm.value)
        .subscribe(res => {
          // console.log(res);

          this.loading = false;
          let msg = 'Store profile updated';
          $.toast({
            text: msg,
            position: 'top-center',
            icon: 'success',
            loader: false,
            allowToastClose: false,
            showHideTransition: 'plain',
            hideAfter: 2000
          });
          localStorage.setItem('store', JSON.stringify(res));
          this.router.navigateByUrl('/');
        }, err => {
          console.log(err);

          this.loading = false;
          let msg = 'Something went wrong, try again';
          $.toast({
            text: msg,
            position: 'top-center',
            icon: 'error',
            loader: false,
            allowToastClose: false,
            showHideTransition: 'plain',
            hideAfter: 2000
          });
        });
    }
  }

}
