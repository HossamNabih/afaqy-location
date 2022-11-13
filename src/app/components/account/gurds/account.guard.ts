import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
	
	token = localStorage.getItem('jwt_token');

	constructor(
		private router: Router
	) {
		
	}

	canActivate() {
		if (this.token ) {
      this.router.navigateByUrl('/Home');
			return false;
		} else {
			return true;
		}
	}
  
}
