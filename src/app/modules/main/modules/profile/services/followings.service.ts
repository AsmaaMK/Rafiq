import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { UserInfoService } from './user-info.service';

const headers = new HttpHeaders();
headers
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

@Injectable({
  providedIn: 'root',
})
export class FollowingsService {
  private url = `${environment.apiUrl}/api/v1/users`;

  myUserName = this.userInfoService.myUserName;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private userInfoService: UserInfoService
  ) {}

  getIsFollowed(userName: string) {
    return this.http.get<any>(`${this.url}/${userName}/isFollowed`, {
      headers: headers,
    });
  }

  follow(userName: string) {
    return this.http.post<any>(`${this.url}/${userName}/follow`, null, {
      headers: headers,
    });
  }

  unfollow(userName: string) {
    return this.http.post<any>(`${this.url}/${userName}/unFollow`, null, {
      headers: headers,
    });
  }
}
