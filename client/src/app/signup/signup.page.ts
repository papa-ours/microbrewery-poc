import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse, LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public response: LoginResponse;

  public constructor(
    public router: Router,
    public loginService: LoginService,
  ) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.minLength(1), Validators.maxLength(24)]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(32)]),
      confirmPassword: new FormControl('', [Validators.minLength(8), Validators.maxLength(32)]),
      email: new FormControl('', [Validators.minLength(1), Validators.maxLength(255), Validators.email]),
      firstName: new FormControl('', [Validators.minLength(1), Validators.maxLength(255)]),
      lastName: new FormControl('', [Validators.minLength(1), Validators.maxLength(255)]),
    }, {
      validators: this.checkPasswords,
    });
  }

  public ngOnInit() {
  }

  public checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
  
    return password === confirmPassword ? null : { notSame: true }     
  }

  public async onSubmit(): Promise<void> {
    this.response = await this.loginService.signUp(this.signupForm);
    if (this.response.error) {
      return;
    }

    this.login();
  }

  public async goToLogin(): Promise<void> {
    this.router.navigate(['login']);
  }

  public async login(): Promise<void> {
    const response = await this.loginService.login(this.signupForm);
    if (response.success) {
      this.router.navigate(['tabs', 'home']);
    }
  }
}
