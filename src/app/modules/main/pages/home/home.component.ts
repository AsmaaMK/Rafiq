import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TestingApiService } from 'src/app/shared/services/testing-api.service';
import { PostData } from '../../components/post/post';
import { PostService } from '../../components/post/post.service';
import { UserInfo } from '../../modules/profile/models/user-info';

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

  postAuthor: UserInfo = {
    userName: 'aaa',
    firstName: 'Asmaa',
    lastName: 'Mahmoud',
    avatar:
      'assets/main-module/post-images/WhatsApp Image 2022-03-24 at 11.34.08 AM.jpeg',
  };

  postData: PostData = {
    content: {
      media: {
        images: [
          'assets/main-module/post-images/WhatsApp Image 2022-03-24 at 11.34.08 AM.jpeg',
        ],
        video: '',
      },
      text: 'Hello World'
    },
    auther: {
      name: 'aaa',
      avatar: ''
    },
    isLiked: true,
    numberOfComments: 0,
    numberOfLikes: 50,
    shared: false,
    sharedFrom: ''
  };

  ngOnInit(): void {}

  logout() {
    this.auth.logoutUser();
  }

  getAccessToken() {
    this.auth.refreshAccessToken();
  }
}
