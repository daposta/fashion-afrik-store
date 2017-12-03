import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

   error :any;
   user: any = {};
   profile: any ;
   bodyClasses: string = "skin-blue sidebar-mini";
  constructor(private userSrv: UserService) { }

  ngOnInit() {
      let tempUser = localStorage.getItem('user');
      if (tempUser) {
          this.user = JSON.parse(tempUser);
      }
      this.getStoreProfile();


      document.body.classList.add("skin-blue");
      document.body.classList.add("sidebar-mini");
      //document.body.classList.add("wysihtml5 - supported");
  }

    getStoreProfile(){
      this.userSrv.getCurrentProfile().then(response =>{
          localStorage.setItem('store',  JSON.stringify(response));
          this.profile =  JSON.parse(localStorage.getItem('store'));
       
        
      }).catch(err => this.error = err)
    }


  logout(){
   
    this.userSrv.logout();
  }

}
