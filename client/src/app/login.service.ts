import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SERVER_URL } from './constants';

export interface LoginResponse {
  success: boolean,
  error?: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public constructor(private http: HttpClient) { }

  public async signUp(signupForm: FormGroup): Promise<LoginResponse> {
    return this.http.post<LoginResponse>(`${SERVER_URL}user/signup`, {
      Username: signupForm.get('username').value,
      Password: signupForm.get('password').value,
      Email: signupForm.get('email').value,
      FirstName: signupForm.get('firstName').value,
      LastName: signupForm.get('lastName').value,
    }).toPromise();
  }

  public async login(loginForm: FormGroup): Promise<LoginResponse> {
    return this.http.post<LoginResponse>(`${SERVER_URL}user/login`, {
      username: loginForm.get('username').value,
      password: loginForm.get('password').value,
    }).toPromise();
  }
}
