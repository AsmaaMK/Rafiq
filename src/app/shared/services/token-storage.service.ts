import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import { UserInfoService } from 'src/app/modules/main/modules/profile/services/user-info.service';
import { LoginResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  REFRESH_TOKEN_KEY = 'refresh-token';
  ACCESS_TOKEN_KEY = 'access-token';
  REMEMBER_ME_KEY = 'remember-me';

  rememberMe$ = new BehaviorSubject(this.getRememberMe());

  constructor() {}

  setRememberMe(rememberMe: boolean): void {
    this.rememberMe$.next(rememberMe);
    localStorage.setItem(this.REMEMBER_ME_KEY, rememberMe ? 'yes' : 'no');
  }

  getRememberMe(): boolean {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === 'yes' ? true : false;
  }

  setRefreshToken(token: string): void {
    this.rememberMe$.value
      ? localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
      : sessionStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string {
    return (
      localStorage.getItem(this.REFRESH_TOKEN_KEY) ||
      sessionStorage.getItem(this.REFRESH_TOKEN_KEY) ||
      ''
    );
  }

  removeRefreshToken(): void {
    this.rememberMe$.value
      ? localStorage.removeItem(this.REFRESH_TOKEN_KEY)
      : sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  setAccessToken(token: string): void {
    this.rememberMe$.value
      ? localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
      : sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string {
    return (
      localStorage.getItem(this.ACCESS_TOKEN_KEY) ||
      sessionStorage.getItem(this.ACCESS_TOKEN_KEY) ||
      ''
    );
  }

  removeAccessToken(): void {
    this.rememberMe$.value
      ? localStorage.removeItem(this.ACCESS_TOKEN_KEY)
      : sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  setUserName(username: string) {
    this.rememberMe$.value
      ? localStorage.setItem('username', username)
      : sessionStorage.setItem('username', username);
  }

  getUserName() {
    return (
      localStorage.getItem('username') ||
      sessionStorage.getItem('username') ||
      ''
    );
  }

  removeUserName() {
    this.rememberMe$.value
      ? localStorage.removeItem('username')
      : sessionStorage.removeItem('username');
  }

  /**
   * function to get username from refresh token
   * @returns username string
   */
  // getUsername(): string {
  //   let refreshToken = this.getRefreshToken();
  //   let payload = this.decodeJWT(refreshToken);

  //   return payload.userName;
  // }

  /**
   * function that decode token and return the payload object
   * @param token
   * @returns payload object
   */
  // decodeJWT(token: string): any {
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));

  //   return JSON.parse(jsonPayload);
  // };
}
