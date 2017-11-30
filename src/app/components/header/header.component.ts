import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    user: any = {};
    bodyClasses: string = "skin-black sidebar-mini";
  constructor() { }

  ngOnInit() {
      let tempUser = localStorage.getItem('user');
      if (tempUser) {
          this.user = JSON.parse(tempUser);
      }

      document.body.classList.add("skin-black");
      document.body.classList.add("sidebar-mini");
      document.body.classList.add("wysihtml5 - supported");
  }

}
