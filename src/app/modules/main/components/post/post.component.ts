import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { PostAuthor, PostData } from './post';
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
  postAuthor: PostAuthor = {
    firstName: '',
    lastName: '',
    userName: '',
    avatar: '',
  };

  isLiked = false;

  constructor(
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.preparePostData(this.postId);
    this.postDataAssigned.subscribe(() => {
      this.postImages = this.postData.content.media.images;
    });

    this.postService
      .getIsLiked(this.postId)
      .subscribe((res) => (this.isLiked = res.isLiked));
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

      this.postService.getPostAuthor(res.author).subscribe((res) => {
        this.postAuthor.avatar = res.avatar;
        this.postAuthor.firstName = res.firstName;
        this.postAuthor.lastName = res.lastName;
        this.postAuthor.userName = res.userName;
      });
    });
  }

  likeOrUnlike() {
    if (this.isLiked) {
      this.postService.unLike(this.postId);
      this.isLiked = false;
      this.postData.numberOfLikes--;
    } else {
      this.postService.like(this.postId);
      this.isLiked = true;
      this.postData.numberOfLikes++;
    }
  }
}
