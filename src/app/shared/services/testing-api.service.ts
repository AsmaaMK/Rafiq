import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const localhost = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TestingApiService {
  private url = `${localhost}/api/v1/users/user_id/posts/post_id`;
  constructor(private http: HttpClient) {}
  
  getPosts() {
    return this.http.get(this.url);
  }
}
