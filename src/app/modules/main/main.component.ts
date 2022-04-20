import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { PostService } from './components/post/post.service';
import { UserInfo } from './modules/profile/models/user-info';
import { UserInfoService } from './modules/profile/services/user-info.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  screenWidth = window.innerWidth;

  images: any[] = [];

  video = '';

  myInfo: UserInfo = {
    userName: '',
    firstName: '',
    lastName: '',
    avatar: 'assets/main-module/profile/default-personal-image.svg',
  };

  postData = new FormData();

  showToaster = new BehaviorSubject(false);
  toasterMessage = '';
  toasterType = false;

  creatingPost = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.possitionAddPostButton();
  }

  constructor(
    private userInfoService: UserInfoService,
    private tokenStorageService: TokenStorageService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.userInfoService
      .getUserInfo(this.tokenStorageService.getUsername())
      .subscribe((res) => {
        this.myInfo = res;
      });
  }

  ngAfterViewInit() {
    this.possitionAddPostButton();
  }

  possitionAddPostButton(): void {
    const main = document.getElementsByTagName('main')[0];
    if (main) {
      const mainRightPossition = main.getBoundingClientRect().right;
      const bodyWidth = document.body.getBoundingClientRect().width;
      const addPostButton = <HTMLElement>(
        document.querySelector('.add-post-btn')
      );
      if (addPostButton) {
        addPostButton.style.right =
          (bodyWidth - mainRightPossition + 40).toString() + 'px';
      }
    }
  }

  openPopup(popup: HTMLElement) {
    popup.classList.add('open');
  }

  closePopup(popup: HTMLElement) {
    popup.classList.remove('open');
  }

  addMention() {
    const textArea = document.getElementById('post-text');
    if (textArea) textArea.innerText = textArea.innerText + '@';
  }

  addVideos(event: any) {
    let video = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.video = event.target.result;
      this.postData.append('post', video, video.name);
    };

    reader.readAsDataURL(video);
  }

  addImages(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        let image = event.target.files[i];

        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.postData.append('post', image, image.name);
        };

        reader.readAsDataURL(image);
      }
    }
  }

  createPost(
    postTextArea: HTMLTextAreaElement,
    videoFile: HTMLInputElement,
    imageFiles: HTMLInputElement,
    popup: HTMLElement
  ) {
    this.creatingPost = true;

    this.postData.append('text', postTextArea.value);
    this.postService.createPost(this.postData).subscribe(
      (res) => {
        this.closePopup(popup);

        videoFile.value = '';
        this.video = '';
        imageFiles.value = '';
        this.images = [];

        this.toasterMessage = 'Post created successfully';
        this.toasterType = true;
        this.showToaster.next(true);
        this.creatingPost = false;
      },
      (err) => {
        this.closePopup(popup);

        videoFile.value = '';
        this.video = '';
        imageFiles.value = '';
        this.images = [];

        this.toasterMessage = 'Failed to create this post';
        this.toasterType = false;
        this.showToaster.next(true);
        this.creatingPost = false;
      }
    );
  }
}
