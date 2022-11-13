import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserModel } from '../../models/user';
import { LoginService} from '../../services/login.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	signInForm: FormGroup;
	errors = [];
	currentLang: string;
  logo:string;
  defaultImage:string
	loading = false;
	constructor(
		protected formBuilder: FormBuilder,
		 protected loginService: LoginService,

		protected activatedRoute: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {


		this.logo = 'assets/imgs/task.PNG';
    this.defaultImage = 'assets/imgs/task.PNG';
		

		this.signInForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			rememberMe: [true]
		});

		this.signInForm.valueChanges.subscribe(() => {
			const keys = Object.keys(this.signInForm.controls);
			this.errors = [];
			for (const key of keys) {
				const control = this.signInForm.controls[key];
				if (
					control.invalid &&
					(control.dirty || key === 'passwordConfirmation')
				) {
					if (!!control.errors.minlength) {
						this.errors.push(
							'Error min length'
						);
					} else if (!!control.errors.doesNotMath) {
						this.errors.push(control.errors.doesNotMath);
					} else if (!!control.errors.required) {
						this.errors.push(
							`required `
						);
					} else {
						this.errors.push(
							` invalid error `
						);
					}
				}
			}
		});
	}

	signIn() {
		this.errors = [];
		this.loading = true;
		const email = this.signInForm.value.email;
		const password = this.signInForm.value.password;
		const rememberMe = this.signInForm.value.rememberMe;
		const storage = rememberMe ? localStorage : sessionStorage;
		this.loginService.login(email, password).pipe(
		).subscribe((data:UserModel) => {
			this.loading = false;
			storage.setItem('user_id', data.user_id.toString());
			storage.setItem('user_firstName', data.firstName);
			storage.setItem('user_lastName', data.lastName);
			storage.setItem('user_email', data.email);
			storage.setItem('jwt_token', data.token);
      this.router.navigate(['Home'])

		},          error => {
			this.loading = false;
			if (error && error.error && error.error.message  ) {
				this.errors.push(error.error.message);


			}
      this.loading = false;
      // procced as login just  for test 
			storage.setItem('user_id', '1');
			storage.setItem('user_firstName', 'Hossam');
			storage.setItem('user_lastName', 'Mohamed');
			storage.setItem('user_email', this.signInForm.value.email);
			storage.setItem('jwt_token', 'zxcfadaggqhq');
      this.router.navigate(['Home'])
		});
	}

}
