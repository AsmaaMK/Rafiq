import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TestingApiService } from 'src/app/shared/services/testing-api.service';
import { PostService } from '../../components/post/post.service';
import { UserInfo } from '../../modules/profile/models/user-info';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { UserInfoResolver } from '../../resolvers/user-info.resolver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private testapi: TestingApiService,
    private auth: AuthService,
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  posts = ['62648b2a2f1713e895c8f324'];

  // postDataAssigned = new BehaviorSubject(true);

  ngOnInit(): void {
    // this.preparePostData(this.postId);
    // this.postDataAssigned.subscribe(() => {
    //   this.postImages = this.postData.content.media.images;
    // });
  }
}
