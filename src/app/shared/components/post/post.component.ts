import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterType } from 'src/app/shared/models/toaster-status';
import { RouterExtService } from 'src/app/shared/services/router-ext.service';
import {
  UserInfo,
  UserProfile,
} from '../../../modules/main/modules/profile/models/user-info';
import { UserInfoService } from '../../../modules/main/modules/profile/services/user-info.service';
import { ToasterService } from '../toaster/toaster.service';
import { MediaType, Post, PostComment, PostData } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  // @Input() postId!: string;
  @Input() postData: PostData = {
    postId: '',
    authorInfo: {
      userName: '',
      firstName: '',
      lastName: '',
      avatar: '',
    },
    content: {
      text: '',
      media: {
        files: [],
        type: 'images',
      },
    },
    numberOfComments: 0,
    numberOfLikes: 0,
    isShared: false,
    sharedSource: {
      authorInfo: {
        userName: '',
        firstName: '',
        lastName: '',
        avatar: '',
      },
      postId: '',
      content: {
        text: '',
        media: {
          type: 'images',
          files: [],
        },
      },
      deleted: false,
    },
    isLiked: false,
  };

  isMyPost = false;
  myUserName = this.userInfoService.myUserName;
  myInfo = this.userInfoService.myInfo;

  comments: PostComment[] = [];

  addCommentForm = new FormGroup({
    commentText: new FormControl('', [Validators.required]),
  });

  deletingPost = false;
  addingComment = false;

  subscription!: Subscription;

  constructor(
    private postService: PostService,
    private router: Router,
    private routerExt: RouterExtService,
    private userInfoService: UserInfoService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.isMyPost =
      this.userInfoService.myUserName.value ===
      this.postData.authorInfo.userName;
  }

  likeOrUnlike() {
    if (this.postData.isLiked) {
      this.postService.unLike(this.postData.postId);
      this.postData.isLiked = false;
      this.postData.numberOfLikes--;
    } else {
      this.postService.like(this.postData.postId);
      this.postData.isLiked = true;
      this.postData.numberOfLikes++;
    }
  }

  showSharePostPopup(popup: HTMLElement, textarea: HTMLTextAreaElement) {
    popup.classList.add('open');
  }

  sharePost(postText: HTMLTextAreaElement, popup: HTMLElement) {
    this.closePopup(popup);

    this.toasterService.showToaster('uploading', 'Sharing Post');

    let formData = new FormData();
    formData.append('text', postText.value);
    postText.value = '';

    this.postService.share(this.postData.postId, formData).subscribe(
      (res) => {
        this.toasterService.showToaster('success', res.results.message);
      },
      (err) => {
        this.toasterService.showToaster('error', err.error.message);
      }
    );
  }

  deletePost(popup: HTMLElement, post: HTMLElement) {
    this.closePopup(popup);
    this.deletingPost = true;
    this.postService.deletePost(this.postData.postId).subscribe(
      () => {
        post.style.display = 'none';

        let isPostPage: boolean = this.router.url.split('/')[2] === 'post';
        if (isPostPage) {
          let prevUrl = this.routerExt.getPreviousUrl();
          this.router.navigate([prevUrl]);
        }
        this.deletingPost = false;
      },
      () => {
        this.toasterService.showToaster('error', `Error when deleting post`);
        this.deletingPost = false;
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
      .getComments(this.postData.postId, this.postData.numberOfComments)
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
      .addComment(this.postData.postId, postText)
      .subscribe((res) => {
        newComment = {
          id: res.results.commentId,
          user: {
            firstName: this.myInfo.value.firstName,
            lastName: this.myInfo.value.lastName,
            userName: this.myUserName.value,
            avatar: this.myInfo.value.avatar,
          },
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
      this.postService
        .unlikeComment(this.postData.postId, comment.id)
        .subscribe();
      comment.isLiked = false;
      comment.numberOfLikes--;
    } else {
      this.postService
        .likeComment(this.postData.postId, comment.id)
        .subscribe();
      comment.isLiked = true;
      comment.numberOfLikes++;
    }
  }

  deleteComment(comment: PostComment) {
    if (comment.id) {
      this.postService
        .deleteComment(this.postData.postId, comment.id)
        .subscribe(() => {
          var commentIndex = this.comments.indexOf(comment);
          this.comments.splice(commentIndex, 1);
          this.postData.numberOfComments--;
        });
    }
  }

  goToPostPage(event: any) {
    if (event.target.nodeName === 'DIV')
      this.router.navigate(['/app/post', this.postData.sharedSource.postId]);
  }
}
