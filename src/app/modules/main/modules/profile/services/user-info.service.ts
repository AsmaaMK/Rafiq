import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { GetUserInfoResponse, UserProfile } from '../models/user-info';

const headers = new HttpHeaders();
headers
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private url = `${environment.apiUrl}/api/v1/users`;

  myUserName = new BehaviorSubject(this.tokenStorageService.getUserName());

  initialUserInfo: UserProfile = {
    avatar: '',
    country: '',
    cover: '',
    dateOfBirth: '',
    firstName: '',
    gender: '',
    lastName: '',
    liveIn: '',
    numberOfFollowers: 0,
    numberOfFollowings: 0,
    numberOfPosts: 0,
    socialMedia: [],
    userName: '',
  };

  myInfo: UserProfile = this.initialUserInfo;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  getUserProfile(userName: string): Observable<UserProfile> {
    return this.http
      .get<any>(`${this.url}/${userName}`, {
        headers: headers,
      })
      .pipe(map((userInfoResponse) => userInfoResponse.results));
  }

  getUserInfo(auther: string) {
    return this.http
      .get<GetUserInfoResponse>(
        `${environment.apiUrl}/api/v1/users/${auther}/info`,
        { headers: headers }
      )
      .pipe(map((res) => res.results));
  }

  changeCover(newCover: FormData) {
    return this.http
      .put<any>(`${this.url}/${this.myUserName.value}/cover`, newCover)
      .pipe(map((res) => res.results));
  }

  deleteCover() {
    return this.http.delete<any>(`${this.url}/${this.myUserName.value}/cover`, {
      headers: headers,
    });
  }

  changeAvatar(newCover: FormData) {
    return this.http
      .put<any>(`${this.url}/${this.myUserName.value}/avatar`, newCover)
      .pipe(map((res) => res.results));
  }

  deleteAvatar() {
    return this.http.delete(`${this.url}/${this.myUserName.value}/avatar`, {
      headers: headers,
    });
  }
}
