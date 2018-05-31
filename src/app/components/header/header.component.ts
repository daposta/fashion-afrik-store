import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  error: any;
  user: any = {};
  store: any = {};
  profile: any;
  loggedIn: boolean;
  bodyClasses: string = "skin-blue sidebar-mini";
  constructor(public userSrv: UserService, private router: Router) { }

  ngOnInit() {
    let tempUser = localStorage.getItem('user');
    if (tempUser) {
      this.user = JSON.parse(tempUser);
    }

    let tempStore = localStorage.getItem('store');
    if (tempStore) {
      this.store = JSON.parse(tempStore);
      // console.log(this.store);
    }
    // this.getStoreProfile();


    document.body.classList.add("skin-blue");
    document.body.classList.add("sidebar-mini");
    //document.body.classList.add("wysihtml5 - supported");
  }

  // getStoreProfile() {
  //   this.userSrv.getCurrentProfile().subscribe(res => {
  //     let data = res;
  //     // console.log(data);
  //     localStorage.setItem('store', JSON.stringify(res));
  //     this.profile = JSON.parse(localStorage.getItem('store'));
  //   })
  // }


  // logout() {
  //   localStorage.clear();
  //   this.loggedIn = false;
  //   this.router.navigate(['/login']);

  //   // this.userSrv.logout();
  // }

  logout() {
    this.userSrv.logout()
      .subscribe(res => {
        localStorage.clear();
        this.router.navigate(['/login']);
      }, (err) => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
  }

}
