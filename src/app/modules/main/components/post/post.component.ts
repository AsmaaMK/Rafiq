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
  numberOfMedia: number = 0;
  indexOfCurrentMedia = 0;

  slider = document.getElementById('slider');
  sliderWidth = 0;

  constructor(
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.preparePostData(this.postId);
    this.postDataAssigned.subscribe(() => {
      const numberOfImages = this.postData.content.media.images.length;
      const numberOfVideos = this.postData.content.media.video === '' ? 0 : 1;
      // this.numberOfMedia = numberOfImages + numberOfVideos;
      this.numberOfMedia = 4;

      this.slider = document.getElementById('slider');

      const widthOfParent =
        this.slider?.parentElement?.getBoundingClientRect().width;

      if (widthOfParent && this.slider) {
        this.sliderWidth = widthOfParent * this.numberOfMedia;
        this.slider.style.width = this.sliderWidth.toString() + 'px';

        const listOfPostMedia = document.querySelectorAll<HTMLElement>(
          '.slider__post-media'
        );

        listOfPostMedia.forEach((postMedia) => {
          postMedia.style.width =
            (this.sliderWidth / this.numberOfMedia - 144).toString() + 'px';
        });
      }
    });
  }

  moveToPreviousMedia(): void {
    // console.log('media: ', this.numberOfMedia);
    if (this.indexOfCurrentMedia > 0) {
      this.indexOfCurrentMedia--;
      console.log(this.indexOfCurrentMedia);
      const translate =
        (this.sliderWidth / this.numberOfMedia) * this.indexOfCurrentMedia;
      console.log('trans: ', translate);
      console.log(this.slider);
      if (this.slider)
        this.slider.style.transform = `translate(${-translate}px)`;
    }
  }

  moveToNextMedia(): void {
    // console.log('media: ', this.numberOfMedia);
    if (this.indexOfCurrentMedia < this.numberOfMedia - 1) {
      this.indexOfCurrentMedia++;
      console.log(this.indexOfCurrentMedia);
      const translate =
        (this.sliderWidth / this.numberOfMedia) * this.indexOfCurrentMedia;
      console.log('trans: ', translate);

      console.log(this.slider);
      if (this.slider)
        this.slider.style.transform = `translate(${-translate}px)`;
    }
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

      FIXME:
      this.userInfoService.getUserInfo(res.author).subscribe((res) => {
        this.postData.auther.name = `${res.firstName} ${res.lastName}`;
        this.postData.auther.avatar = res.avatar;
      });
    });
  }
}
