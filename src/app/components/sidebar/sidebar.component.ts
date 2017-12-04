import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
  store: any
  constructor() { }

  ngOnInit() {
  	this.store =  JSON.parse(localStorage.getItem('store'));
  	
  }

}
