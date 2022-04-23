import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  myInfo!: UserInfo;

  showToaster = false;
  toasterMessage = '';
  toasterType: ToasterType = 'error';

  comments: PostComment[] = [];

  addCommentForm = new FormGroup({
    commentText: new FormControl('', [Validators.required]),
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

    this.userInfoService
      .getUserInfo(this.myUserName.value)
      .subscribe((res) => (this.myInfo = res));
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

  showSharePostPopup(popup: HTMLElement) {
    popup.classList.add('open');
  }

  sharePost(postText: HTMLTextAreaElement, popup: HTMLElement) {
    this.closePopup(popup);

    this.toasterMessage = 'Sharing post';
    this.toasterType = 'uploading';
    this.showToaster = true;

    let formData = new FormData();
    formData.append('text', postText.value);
    postText.value = '';

    this.postService.share(this.postId, formData).subscribe(
      (res) => {
        this.toasterMessage = res.results.message;
        this.toasterType = 'success';
      },
      (err) => {
        this.toasterMessage = err.error.message;
        this.toasterType = 'error';
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
    this.addCommentForm.reset();
    this.addingComment = true;

    this.postService
      .addComment(this.postId, postText)
      .subscribe((res) => {
        newComment = {
          id: res.results.commentId,
          user: this.myInfo,
          isLiked: false,
          numberOfLikes: 0,
          text: postText,
        };

        this.postData.numberOfComments++;
        this.comments.unshift(newComment);
        this.addingComment = false;
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
