import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { PostData } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() postId!: string;

  postData: PostData = this.postService.initialPostData;
  postDataAssigned = new BehaviorSubject(true);

  postImages!: string[];

  constructor(
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
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

      this.postDataAssigned.next(true);

      // FIXME:
      // this.userInfoService.getUserInfo(res.author).subscribe((res) => {
      //   this.postData.auther.name = `${res.firstName} ${res.lastName}`;
      //   this.postData.auther.avatar = res.avatar;
      // });
    });
  }
}
