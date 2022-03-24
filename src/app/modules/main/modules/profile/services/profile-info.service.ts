import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfoResponse } from '../models/user-profile-info';

@Injectable({
  providedIn: 'root',
})
export class ProfileInfoService {
  private url = `${environment.apiUrl}/api/v1/users`;

  constructor(private http: HttpClient, private router: Router) {}

  getUserInfo(userName: string): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(`${this.url}/${userName}/info`);
  }
}
