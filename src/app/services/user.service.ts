import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Globals } from '../shared/api';
@Injectable()
export class UserService {

  private loginUrl = this.globals.LOGIN_URL; 
  private logoutUrl = this.globals.LOGOUT_URL; 
  // v = localStorage.getItem('auth_token');
  // private options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json',
  // 'Authorization': 'JWT ' +this.v
  // })});

  private  loggedIn = false;


  constructor(private http: Http, private router:Router, private globals: Globals) { }

  login(email: string, password : string){
		//this.logout();
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin', '*') 
		return this.http.post(this.loginUrl,  JSON.stringify({email, password}), {headers})
		.subscribe(res =>{
				let data = res.json();
				console.log(data)
				console.log(data.token)
				if (data.token){
					localStorage.setItem('auth_token', data.token);
					localStorage.setItem('user', JSON.stringify(data.user));
					window.location.href= '/';
				
					}
					else{
						this.router.navigateByUrl('/login');
					}

		}, error =>{
			
			if(!error.status){
				console.log(error);
				//this._toasterService.pop('error', "You are not connected to the server", '');
			}else{
				console.log(error);
				//this.evil = JSON.parse(error['_body']).non_field_errors[0];
				//this._toasterService.pop('error', this.evil, '');
			}
		
			
		})

		
	};


	logout(){
			let v = this.page_header();
			localStorage.clear();
			this.router.navigate(['/login']);
			
	};

	private page_header(){
     let data =  localStorage.getItem('auth_token');
      let headers = new Headers();
      let opt: RequestOptions;
      headers.append('Authorization', 'JWT ' + data );
      opt = new RequestOptions({headers: headers})  ;
      return opt;
  }

}
