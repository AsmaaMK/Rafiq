import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { ForgotPasswordRequest, RefreshAccessTokenResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetPasswordRequest, ResetPasswordResponse } from '../models';
import { TokenStorageService } from './token-storage.service';

const localhost = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${localhost}/api/v1/auth`;

  isLoggedIn$ = new BehaviorSubject<boolean>(!!this.tokenStorage.getRefreshToken());

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router) { }

  registerUser(body: RegisterRequest) {
    this.http.post<RegisterResponse>(`${this.url}/register`, body);
  }

  loginUser(body: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.url}/login`, body);
  }

  logoutUser(): void {
    this.tokenStorage.removeAccessToken();
    this.tokenStorage.removeRefreshToken();
    this.router.navigate(['/unauthorized']);
  }

  forgetPassword(body: ForgotPasswordRequest) {
    return this.http.post<null>(`${this.url}/forgotPassword`, body);
  }

  resetPassword(body: ResetPasswordRequest) {
    return this.http.put<ResetPasswordResponse>(`${this.url}/resetPassword`, body);
  }


  refreshToken(token: string) {
    let headers = new HttpHeaders()
    headers = headers.append(this.tokenStorage.REFRESH_TOKEN_KEY, token);

    return this.http.post<RefreshAccessTokenResponse>(`${this.url}/accessToken`, null, {
      headers: headers
    })
  }

  refreshAccessToken(): void {
    let headers = new HttpHeaders();
    const refreshToken = this.tokenStorage.getRefreshToken();

    if (refreshToken) {
      headers = headers.append(this.tokenStorage.REFRESH_TOKEN_KEY, refreshToken);
    } else {
      this.logoutUser();
      return;
    }

    this.http.post<RefreshAccessTokenResponse>(`${this.url}/accessToken`, null, {
      headers: headers
    }).subscribe(
      res => {
        const accessToken = res.results?.accessToken;
        const refreshToken = res.results?.refreshToken;

        if (accessToken && refreshToken) {
          this.tokenStorage.setAccessToken(accessToken);
          this.tokenStorage.setRefreshToken(refreshToken);
        } else {
          console.warn('Access token | refresh token not found');
        }
      },
      err => {
        console.warn('Error in access token request');
        throwError(err);
      }
    );
  }
}
