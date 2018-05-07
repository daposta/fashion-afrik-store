import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [UserService]
})
export class MyProfileComponent implements OnInit {

  store: any = {};

  constructor(public userSrv: UserService) { }

  ngOnInit() {
    let tempStore = localStorage.getItem('store');
    if (tempStore) {
      this.store = JSON.parse(tempStore);
      console.log(this.store);
    }
  }

}
