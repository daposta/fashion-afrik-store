import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css'],
  providers: [UserService,]
})
export class AccountActivationComponent implements OnInit {

  user: Object= {};
  constructor(private userSrv : UserService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.switchMap((params: Params) => 
  		this.userSrv.activateAccount( params)
  		//console.log(params);
  		)
  		
			 .subscribe(
			 	data => {
           		
           			this.user = data;
        });
     
  }

}
