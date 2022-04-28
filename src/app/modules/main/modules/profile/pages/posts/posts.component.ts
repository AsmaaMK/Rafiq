import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { POST, Post, PostData } from 'src/app/shared/components/post/post';
import { PostService } from 'src/app/shared/components/post/post.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  myUserName = this.userInfoService.myUserName.value;
  urlUserName = this.router.url.split('/')[3];
  isMyProfile = this.myUserName === this.urlUserName;

  posts: POST[] = [];

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.postService.getInitialPosts(this.urlUserName).subscribe(
      posts => {
        for (let post of posts) {
          const newPost = new POST(post, this.postService);
          this.posts.push(newPost);
        }
      }
    )
  }
}