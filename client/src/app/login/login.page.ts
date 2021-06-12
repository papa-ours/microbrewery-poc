import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse, LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  public constructor(
    public router: Router,
    public loginService: LoginService,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.minLength(1), Validators.maxLength(24)]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(32)]),
    });
  }

  public ngOnInit() {
  }

  public async goToSignUp(): Promise<void> {
    this.router.navigate(['signup']);
  }

  public async login(): Promise<void> {
    const response: LoginResponse = await this.loginService.login(this.loginForm);
    if (response.success) {
      this.router.navigate(['tabs', 'home']);
    }
  }
}
