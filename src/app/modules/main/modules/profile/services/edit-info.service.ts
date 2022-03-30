import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
export class EditInfoService {
  private url = `${environment.apiUrl}/api/v1/users`;

  myUserName = this.tokenStorageService.getUsername();

  showEditInfo = new BehaviorSubject(true);

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

 
}
