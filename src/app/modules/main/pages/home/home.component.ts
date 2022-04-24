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

  posts = [
    '62653bd48622e648819139e2',
    '626565e78622e64881913bda',
    '6264878bdb7ea6a449ca9698',
    '62658e988622e648819140e0',
    '62658f218622e64881914118',
    '6265903c8622e6488191416d',
  ];

  // postDataAssigned = new BehaviorSubject(true);

  ngOnInit(): void {}
}
