import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import {
  ForgotPasswordRequest,
  RefreshAccessTokenResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../models';
import { TokenStorageService } from './token-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.apiUrl}/api/v1/auth`;

  isLoggedIn$ = new BehaviorSubject<boolean>(
    !!this.tokenStorage.getRefreshToken()
  );

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  contentTypeHeader = {
    headers: {
      'content-type': 'application/json',
    },
  };

  registerUser(body: RegisterRequest) {
    return this.http.post<RegisterResponse>(
      `${this.url}/register`,
      body,
      this.contentTypeHeader
    );
  }

  loginUser(body: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${this.url}/login`,
      body,
      this.contentTypeHeader
    );
  }

  logoutUser(): void {
    this.tokenStorage.removeAccessToken();
    this.tokenStorage.removeRefreshToken();
    this.isLoggedIn$.next(false);
    this.router.navigate(['/auth/login']);
  }

  forgetPassword(body: ForgotPasswordRequest) {
    return this.http.post<null>(
      `${this.url}/forgotPassword`,
      body,
      this.contentTypeHeader
    );
  }

  resetPassword(body: ResetPasswordRequest) {
    return this.http.put<ResetPasswordResponse>(
      `${this.url}/resetPassword`,
      body,
      this.contentTypeHeader
    );
  }

  refreshToken(token: string) {
    let headers = new HttpHeaders();
    headers = headers
      .append(this.tokenStorage.REFRESH_TOKEN_KEY, token)
      .append('content-type', 'application/json');

    return this.http.post<RefreshAccessTokenResponse>(
      `${this.url}/accessToken`,
      null,
      {
        headers: headers,
      }
    );
  }

  refreshAccessToken(): void {
    let headers = new HttpHeaders();
    const refreshToken = this.tokenStorage.getRefreshToken();

    if (refreshToken) {
      headers = headers
        .append(this.tokenStorage.REFRESH_TOKEN_KEY, refreshToken)
        .append('content-type', 'application/json');
    } else {
      this.logoutUser();
      return;
    }

    this.http
      .post<RefreshAccessTokenResponse>(`${this.url}/accessToken`, null, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          const accessToken = res.results?.accessToken;
          const refreshToken = res.results?.refreshToken;

          if (accessToken && refreshToken) {
            this.tokenStorage.setAccessToken(accessToken);
            this.tokenStorage.setRefreshToken(refreshToken);
          } else {
            console.warn('Access token | refresh token not found');
          }
        },
        (err) => {
          console.warn('Error in access token request');
          throwError(err);
        }
      );
  }
}
