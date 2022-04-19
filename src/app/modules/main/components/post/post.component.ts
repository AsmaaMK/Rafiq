import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RouterExtService } from 'src/app/shared/services/router-ext.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment.prod';
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

  isMyProfile = false;

  showToaster = new BehaviorSubject(false);
  toasterMessage = '';
  toasterType = false;

  deleting = false;

  constructor(
    private postService: PostService,
    private tokeStorageService: TokenStorageService,
    private router: Router,
    private routerExt: RouterExtService
  ) {}

  ngOnInit() {
    this.isMyProfile =
      this.tokeStorageService.getUsername() === this.postAuthor.userName;
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
        this.toasterMessage = `Post deleted successfully`;
        this.toasterType = true;
        this.showToaster.next(true);
        this.deleting = false;

        let isPostPage: boolean = this.router.url.split('/')[2] === 'post';
        if (isPostPage) {
          let prevUrl = this.routerExt.getPreviousUrl();
          this.router.navigate([prevUrl]);
        }
      },
      () => {
        this.toasterMessage = `Error when deleting post`;
        this.toasterType = false;
        this.showToaster.next(true);
        this.deleting = false;
      }
    )
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
}
