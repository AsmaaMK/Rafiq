import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
export class EditInfoService {
  private url = `${environment.apiUrl}/api/v1/users`;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private userInfoService: UserInfoService
  ) {}

  editInfo(body: any) {
    return this.http.put<any>(
      `${this.url}/${this.userInfoService.myUserName.value}/info`,
      body,
      {
        headers: headers,
      }
    );
  }

  editPassword(password: string) {
    return this.http.put<any>(
      `${this.url}/${this.userInfoService.myUserName.value}/password`,
      {
        password: password,
        confirmPassword: password,
      },
      {
        headers: headers,
      }
    );
  }
}
