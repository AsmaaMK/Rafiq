import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';

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

  myUserName = this.tokenStorageService.getUsername();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  getNumberOfFollowers(
    userName: string
  ): Observable<{ numberOfFollowers: number }> {
    return this.http
      .get<any>(`${this.url}/${userName}/numberOfFollowers`, {
        headers: headers,
      })
      .pipe(map((res) => res.results));
  }

  getIsFollowed(userName: string): Observable<{ isFollowing: boolean }> {
    return this.http
      .get<any>(`${this.url}/${userName}/isFollowed`, {
        headers: headers,
      })
      .pipe(map((res) => res.results));
  }
}
