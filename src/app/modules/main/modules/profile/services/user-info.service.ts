import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { UserInfo, UserInfoResponse } from '../models/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private url = `${environment.apiUrl}/api/v1/users`;

  myProfileInfo!: UserInfo;
  myAvatar = new BehaviorSubject('');
  myCover = new BehaviorSubject('');
  myUserName = this.tokenStorageService.getUsername();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  getUserInfo(userName: string): Observable<UserInfo> {
    return this.http
      .get<UserInfoResponse>(`${this.url}/${userName}/info`, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(map((userInfoResponse) => userInfoResponse.results));
  }

  getCover(userName: string) {
    let headers = new HttpHeaders();
    headers
      .append('Accept', 'application/json')
      .append('content-type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');

    return this.http
      .get<any>(`${this.url}/${userName}/cover`, {
        headers: headers,
      })
      .pipe(map((res) => res.results));
  }

  changeCover(newCover: FormData) {
    return this.http
      .put<any>(`${this.url}/${this.myUserName}/cover`, newCover)
      .pipe(map((res) => res.results));
  }

  deleteCover() {
    let headers = new HttpHeaders();
    headers
      .append('Accept', 'application/json')
      .append('content-type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');

    return this.http.delete<any>(`${this.url}/${this.myUserName}/cover`, {
      headers: headers,
    });
  }

  getAvatar(userName: string) {
    let headers = new HttpHeaders();
    headers
      .append('Accept', 'application/json')
      .append('content-type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');

    return this.http
      .get<any>(`${this.url}/${userName}/avatar`, {
        headers: headers,
      })
      .pipe(map((res) => res.results));
  }

  changeAvatar(newCover: FormData) {
    return this.http
      .put<any>(`${this.url}/${this.myUserName}/avatar`, newCover)
      .pipe(map((res) => res.results));
  }

  deleteAvatar() {
    let headers = new HttpHeaders();
    headers
      .append('Accept', 'application/json')
      .append('content-type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');

    return this.http.delete<any>(`${this.url}/${this.myUserName}/avatar`, {
      headers: headers,
    });
  }
}
