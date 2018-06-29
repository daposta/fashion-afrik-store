import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Globals } from '../shared/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

	private loginUrl = this.globals.LOGIN_URL;
	private logoutUrl = this.globals.LOGOUT_URL;
	private registerUrl = this.globals.REGISTER_URL;
	private userProfileUrl = this.globals.CURRENT_PROFILE_URL;
	private checkPwUrl = this.globals.CHECK_PASSWORD_URL;
	private userUrl = this.globals.USER_URL;

	authToken = localStorage.getItem('auth_token');

	constructor(private http: HttpClient, private globals: Globals) { }

	login(email: string, password: string): Observable<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

		return this.http.post(this.loginUrl, JSON.stringify({ email, password }), { headers });
	};

	register(data: any): Observable<any> {

		let formData = new FormData();
		formData.append('first_name', data['first_name']);
		formData.append('last_name', data['last_name']);
		formData.append('password', data['password']);
		formData.append('mobile', data['mobile']);
		formData.append('email', data['email']);
		formData.append('agreedToTerms', data['agreedToTerms']);
		formData.append('is_store', 'true');

		return this.http.post(this.registerUrl, formData)
	}

	getCurrentProfile(): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.authToken
			})
		};

		return this.http.get(this.userProfileUrl, httpOptions)
	};

	checkPassword(password: string): Observable<any> {
		let formData = new FormData();
		formData.append('password', password);

		const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

		return this.http.post(this.checkPwUrl, formData, { headers })
	}

	resetPassword(password: string): Observable<any> {
		let formData = new FormData();
		formData.append('password', password);

		const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.authToken })

		return this.http.patch(this.userUrl, formData, { headers })
	}

	logout(): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.authToken
			})
		};
		return this.http.get(this.logoutUrl, httpOptions)
	}

}
