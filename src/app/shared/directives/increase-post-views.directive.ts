import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UserInfoService } from 'src/app/modules/main/modules/profile/services/user-info.service';
import { PostService } from '../components/post/post.service';

@Directive({
  selector: '[appIncreasePostViews]',
})
export class IncreasePostViewsDirective
  implements OnDestroy, OnInit, AfterViewInit
{
  @Input() postId!: string;
  observer!: IntersectionObserver;
  post!: HTMLElement;

  debounceTime = 1000;
  views = 0;

  constructor(
    private el: ElementRef,
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.post = this.el.nativeElement;
    this.initIntersectionObserver();
    this.observer.observe(this.post);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  increaseNumberOfViews() {
    this.postService.increaseNumberOfViews(
      this.userInfoService.myUserName.value,
      this.postId
    );
  }

  increaseNumberOfViewsIfStillVisible() {
    setTimeout(async () => {
      const isStillVisible = await this.isVisible(this.post);
      if (isStillVisible) {
        this.increaseNumberOfViews();
      }
    }, 2000);
  }

  initIntersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.increaseNumberOfViewsIfStillVisible();
      }
    }, options);
  }

  isVisible(element: HTMLElement) {
    return new Promise((resolve) => {
      const observer = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1);
        observer.disconnect();
      });

      observer.observe(element);
    });
  }
}
