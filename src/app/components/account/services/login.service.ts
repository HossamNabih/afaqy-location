import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../models/user';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	logged = new BehaviorSubject<boolean>(false);
	private language = {};
	constructor (
		private httpClient: HttpClient,
		private router: Router,
	
	) {

		if (localStorage.getItem('user_id') || sessionStorage.getItem('user_id')) {
			this.logged.next(true);
		} else {
			this.logged.next(false);
		}
	}
	isLoggedIn (): boolean {
		if (localStorage.getItem('user_id') || sessionStorage.getItem('user_id')) {
			this.logged.next(true);
			return true;
		}
		this.logged.next(false);
		return false;
	}





	login (email: string, password: string):Observable<UserModel> {
		const data = {
			username: email,
			password: password
		};
	
    // suppose api
    return this.httpClient.post<UserModel>(
			`${environment.apiUrl}/login`,
			data
		);
	}

	loggedIn (): void {
		this.logged.next(true);
	
	}

	logOut (): void {
		localStorage.getItem('user_id') ? localStorage.removeItem('user_id') : sessionStorage.removeItem('user_id');
		localStorage.getItem('user_firstName') ? localStorage.removeItem('user_firstName') : sessionStorage.removeItem('user_firstName');
		localStorage.getItem('user_lastName') ? localStorage.removeItem('user_lastName') : sessionStorage.removeItem('user_lastName');
		localStorage.getItem('user_email') ? localStorage.removeItem('user_email') : sessionStorage.removeItem('user_email');
		localStorage.getItem('jwt_token') ? localStorage.removeItem('jwt_token') : sessionStorage.removeItem('jwt_token');
	
		this.logged.next(false);
	}










}
