import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToasterType } from 'src/app/shared/models/toaster-status';
import { RouterExtService } from 'src/app/shared/services/router-ext.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfo } from '../../modules/profile/models/user-info';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { PostComment, PostData } from './post';
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

  isMyProfile = false;

  myUserName = this.userInfoService.myUserName;

  showToaster = false;
  toasterMessage = '';
  toasterType: ToasterType = 'error';

  comments: PostComment[] = [];

  addCommentForm = new FormGroup({
    commentText: new FormControl(''),
  });

  deleting = false;
  addingComment = false;

  constructor(
    private postService: PostService,
    private tokeStorageService: TokenStorageService,
    private router: Router,
    private routerExt: RouterExtService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.isMyProfile =
      this.userInfoService.myUserName.value === this.postAuthor.userName;
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

  deletePost(popup: HTMLElement, post: HTMLElement) {
    this.closePopup(popup);
    this.deleting = true;
    this.postService.deletePost(this.postId).subscribe(
      () => {
        post.style.display = 'none';

        let isPostPage: boolean = this.router.url.split('/')[2] === 'post';
        if (isPostPage) {
          let prevUrl = this.routerExt.getPreviousUrl();
          this.router.navigate([prevUrl]);
        }
      },
      () => {
        this.toasterMessage = `Error when deleting post`;
        this.toasterType = 'error';
        this.showToaster = true;
        this.deleting = false;
      }
    );
  }

  toggleOptionsList(list: HTMLElement) {
    if (list.classList.contains('show')) {
      list.classList.remove('show');
    } else {
      list.classList.add('show');
    }
  }

  closePopup(popup: HTMLElement) {
    popup.classList.remove('open');
  }

  openDeletePostPopup(popup: HTMLElement) {
    popup.classList.add('open');
  }

  showComments(commetsSection: HTMLElement) {
    commetsSection.classList.toggle('show');
    if (this.comments.length === 0) {
      this.getComments();
    }
  }

  getComments() {
    this.postService
      .getComments(this.postId, this.postData.numberOfComments)
      .subscribe((res) => {
        for (let comment of res) {
          this.userInfoService.getUserInfo(comment.author).subscribe((res) => {
            const com: PostComment = {
              id: comment._id,
              user: res,
              isLiked: comment.isLiked,
              numberOfLikes: comment.numberOfLikes,
              text: comment.content.text,
            };

            this.comments.push(com);
          });
        }
      });
  }

  addComment(textInput: HTMLInputElement) {
    let newComment: PostComment;
    let postText = textInput.value;
    textInput.value = '';
    this.addingComment = true;
    
    this.postService
      .addComment(this.postId, postText)
      .subscribe((commentRes) => {
        this.userInfoService
          .getUserInfo(this.userInfoService.myUserName.value)
          .subscribe((userRes) => {
            newComment = {
              id: commentRes.results.commentId,
              user: userRes,
              isLiked: false,
              numberOfLikes: 0,
              text: postText,
            };
            

            this.postData.numberOfComments++;
            this.comments.unshift(newComment);
            this.addingComment = false;
          });
      });
  }

  likeOrUnlikeComment(comment: PostComment) {
    if (comment.isLiked) {
      this.postService.unlikeComment(this.postId, comment.id).subscribe();
      comment.isLiked = false;
      comment.numberOfLikes--;
    } else {
      this.postService.likeComment(this.postId, comment.id).subscribe();
      comment.isLiked = true;
      comment.numberOfLikes++;
    }
  }

  deleteComment(comment: PostComment) {
    if (comment.id) {
      this.postService.deleteComment(this.postId, comment.id).subscribe(() => {
        var commentIndex = this.comments.indexOf(comment);
        this.comments.splice(commentIndex, 1);
        this.postData.numberOfComments--;
      });
    }
  }
}
