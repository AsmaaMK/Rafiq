import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../../modules/profile/models/user-info';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { PostData } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() postId: string = '';
  @Input() postImages: string[] = [];
  @Input() postData: PostData = this.postService.initialPostData;
  @Input() postAuthor: UserInfo = {
    firstName: '',
    lastName: '',
    userName: '',
    avatar: 'assets/main-module/profile/default-personal-image.svg',
  };

  showToaster = new BehaviorSubject(false);
  toasterMessage = '';
  toasterType = false;

  constructor(
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
  }

  
  likeOrUnlike() {
    if (this.postData.isLiked) {
      this.postService.unLike(this.postId);
      this.postData.isLiked = false;
      this.postData.numberOfLikes--;
    } else {
      this.postService.like(this.postId);
      this.postData.isLiked = true;
      this.postData.numberOfLikes++;
    }
  }

  sharePost() {
    this.postService.share(this.postId).subscribe(
      (res) => {
        // TODO: show success message
        console.log(res);
      },
      (err) => {
        // TODO: show error message
      }
    );
  }
}
