import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  myUserName = this.userInfoService.myUserName;
  urlUserName =  this.router.url.split('/')[3];
  isMyProfile = this.myUserName === this.urlUserName;

  posts = [];

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {}
}
