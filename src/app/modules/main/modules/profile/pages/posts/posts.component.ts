import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { POST } from 'src/app/shared/components/post/post';
import { PostService } from 'src/app/shared/components/post/post.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, AfterViewInit, OnDestroy {
  myUserName = this.userInfoService.myUserName.value;
  urlUserName = this.router.url.split('/')[3];
  isMyProfile = this.myUserName === this.urlUserName;

  posts: POST[] = [];
  showSpinner = true;

  @ViewChildren('lastElement', { read: ElementRef })
  lastElement!: QueryList<ElementRef>;
  observer!: IntersectionObserver;

  constructor(
    private router: Router,
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.getInitialPosts();
  }

  ngAfterViewInit(): void {
    this.lastElement.changes.subscribe((d) => {
      this.initIntersectionObserver(null, d.last.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  getInitialPosts() {
    this.postService.getInitialPosts(this.urlUserName).subscribe((posts) => {
      for (let post of posts) {
        const newPost = new POST(post, this.postService);
        this.posts.push(newPost);
        this.showSpinner = false;
      }
    });
  }

  getMorePosts() {
    const lastPostId = this.posts[this.posts.length - 1].postData.postId;
    if (this.userInfoService.myInfo.value.numberOfPosts === this.posts.length) {
      return;
    }

    this.postService
      .getMorePosts(this.urlUserName, lastPostId)
      .subscribe((posts) => {
        for (let post of posts) {
          const newPost = new POST(post, this.postService);
          this.posts.push(newPost);
        }
      });
  }

  initIntersectionObserver(root: HTMLElement | null, element: HTMLElement) {
    let options = {
      root: root,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.getMorePosts();
      }
    }, options);

    this.observer.observe(element);
  }
}
