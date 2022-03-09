import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestingApiService {
  private url = `${environment.apiUrl}/api/v1/users/user_id/posts/post_id`;
  constructor(private http: HttpClient) {}
  
  getPosts() {
    return this.http.get(this.url);
  }
}
