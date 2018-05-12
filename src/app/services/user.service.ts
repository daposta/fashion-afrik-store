import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Globals } from '../shared/api';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

declare var $: any;



@Injectable()
export class UserService {

	private loginUrl = this.globals.LOGIN_URL;
	private logoutUrl = this.globals.LOGOUT_URL;
	private registerUrl = this.globals.REGISTER_URL;
	private userProfileUrl = this.globals.CURRENT_PROFILE_URL;
	private activationUrl = this.globals.ACCOUNT_ACTIVATION_URL;


	private loggedIn = false;
	public loading: boolean = false;


	constructor(private http: Http, private router: Router, private globals: Globals) { }

	login(email: string, password: string) {
		//this.logout();
		let headers = new Headers();
		this.loading = true;
		headers.append('Content-Type', 'application/json');
		// headers.append('Access-Control-Allow-Origin', '*')
		return this.http.post(this.loginUrl, JSON.stringify({ email, password }), { headers })
			.subscribe(res => {
				let data = res.json();

				if (data.token) {
					localStorage.setItem('auth_token', data.token);
					localStorage.setItem('user', JSON.stringify(data.user));
					this.loading = false;
					window.location.href = '/';
				}
				else {
					this.loading = false;
					this.router.navigateByUrl('/login');
				}

			}, error => {

				let msg = JSON.parse(error._body)['message'];
				this.loading = false;
				$.toast({
					text: msg,
					position: 'top-center',
					'icon': 'error'
				})
			})
	};

	// login<T>(email: string, password: string): Observable<T> {
	// 	let headers = new Headers();
	// 	headers.append('Content-Type', 'application/json');
	// 	return this.http.post(this.loginUrl, JSON.stringify({email, password}), {headers});
	// }


	logout() {
		let v = this.page_header();
		// localStorage.clear();
		// this.router.navigate(['/login']);

		this.http.post(this.logoutUrl, {}, v).subscribe(res => {
			localStorage.clear();
			this.loggedIn = false;
			this.router.navigate(['/login']);
		}, (err) => {
			localStorage.clear();
			this.router.navigate(['/login']);

		})

	};


	register(data: any) {

		//let error =  <HTMLInputElement>document.getElementById('feedback_success');
		return this.http.post(this.registerUrl, data)
			.subscribe(res => {

				let msg = JSON.parse(res['_body'])['message'];
				$.toast({
					text: msg,
					position: 'top-center',
					'icon': 'success',
					showHideTransition: 'slide',
				});


			}, error => {

				let msg = JSON.parse(error._body)['message'];
				$.toast({
					text: msg,
					position: 'top-center',
					icon: 'error',
					showHideTransition: 'slide',
				});

			})

	};


	activateAccount(data: any) {
		console.log(data);
		return this.http.get(this.activationUrl + data['uid'] + '/' + data['token'] + '/')
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	};

	getCurrentProfile() {

		let v = this.page_header();
		return this.http.get(this.userProfileUrl, v)
			.toPromise()
			.then(response => response.json())
		//.catch(this.handleError);
	};

	private page_header() {
		let data = localStorage.getItem('auth_token');
		let headers = new Headers();
		let opt: RequestOptions;
		headers.append('Authorization', 'JWT ' + data);
		opt = new RequestOptions({ headers: headers });
		return opt;
	}


	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	};


}
