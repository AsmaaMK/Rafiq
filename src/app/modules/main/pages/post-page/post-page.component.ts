import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RouterExtService } from 'src/app/shared/services/router-ext.service';
import { PostData } from '../../components/post/post';
import { PostService } from '../../components/post/post.service';
import { UserInfo } from '../../modules/profile/models/user-info';
import { UserInfoService } from '../../modules/profile/services/user-info.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  previousUrl = '';
  postId: string = this.router.url.split('/')[3];

  postDataAssigned = new BehaviorSubject(false);
  
  postData: PostData = this.postService.initialPostData;
  postImages: string[] = [];
  postAuthor: UserInfo = {
    firstName: '',
    lastName: '',
    userName: '',
    avatar: 'assets/main-module/profile/default-personal-image.svg',
  };


  // showToaster = new BehaviorSubject(false);
  // toasterMessage = '';
  // toasterType = false;

  constructor(
    private routerExtService: RouterExtService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    // get previous URL
    this.previousUrl = this.routerExtService.getPreviousUrl();
    if (this.previousUrl === '' || this.previousUrl === this.router.url)
      this.previousUrl = '/app/home';

    this.preparePostData(this.postId);
    this.postDataAssigned.subscribe(() => {
      this.postImages = this.postData.content.media.images;
    });
  }

  preparePostData(postId: string) {
    this.postService.getPostById(postId).subscribe((res) => {
      this.postData.content.text = res.content.text;
      this.postData.content.media = this.postService.classifyPostMedia(
        res.content.files
      );
      this.postData.shared = res.shared;
      this.postData.sharedFrom = res.sharedSource?.author;
      this.postData.numberOfLikes = res.numberOfLikes;
      this.postData.numberOfComments = res.numberOfComments;
      this.postData.isLiked = res.isLiked;
      
      this.userInfoService.getUserInfo(res.author).subscribe((res) => {
        if (res.avatar) this.postAuthor.avatar = res.avatar;
        this.postAuthor.firstName = res.firstName;
        this.postAuthor.lastName = res.lastName;
        this.postAuthor.userName = res.userName;
        this.postDataAssigned.next(true);
      });
    });
  }
}
