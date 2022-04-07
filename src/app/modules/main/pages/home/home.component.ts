import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TestingApiService } from 'src/app/shared/services/testing-api.service';
import { PostService } from '../../components/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private testapi: TestingApiService,
    private auth: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logoutUser();
  }

  getAccessToken() {
    this.auth.refreshAccessToken();
  }
}
