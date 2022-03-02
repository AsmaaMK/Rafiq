import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordRequest, RefreshAccessTokenResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetPasswordRequest, ResetPasswordResponse } from '../models';
import { TokenStorageService } from './token-storage.service';

const remotehost = 'https://62113b5701ccdac0741f933a.mockapi.io';
const localhost = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${localhost}/api/v1/auth`;

  isLoggedIn$ = new BehaviorSubject<boolean>(!!this.tokenStorage.getRefreshToken());

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  registerUser(body: RegisterRequest) {
    this.http.post<RegisterResponse>(`${this.url}/register`, body);
  }

  loginUser(body: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.url}/login`, body);
  }

  forgetPassword(body: ForgotPasswordRequest) {
    return this.http.post<null>(`${this.url}/forgotPassword`, body);
  }

  resetPassword(body: ResetPasswordRequest) {
    return this.http.put<ResetPasswordResponse>(`${this.url}/resetPassword`, body);
  }

  refreshAccessToken() {
    return this.http.post<RefreshAccessTokenResponse>(`${this.url}/accessToken`, {
      'refreshToken': this.tokenStorage.getRefreshToken()
    });
  }
}
