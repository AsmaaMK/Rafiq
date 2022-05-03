import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToasterType } from 'src/app/shared/models/toaster-status';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { PostService } from '../../shared/components/post/post.service';
import { UserInfo, UserProfile } from './modules/profile/models/user-info';
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

  myInfo = this.userInfoService.myInfo;

  postData = new FormData();

  showToaster = false;
  toasterMessage = '';
  toasterType: ToasterType = 'error';

  creatingPost = false;

  postDataForm!: FormGroup;

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
    this.userInfoService.getUserProfile(this.userInfoService.myUserName.value).subscribe((res) => {
      this.userInfoService.myInfo.next(res);
    });

    this.postDataForm = new FormGroup({
      images: new FormControl(''),
      video: new FormControl(''),
      text: new FormControl('')
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
    popup: HTMLElement
  ) {
    this.toasterType = 'uploading';
    this.toasterMessage = 'uploading post files';
    this.showToaster = true;
    this.closePopup(popup);

    this.postData.append('text', postTextArea.value);
    this.postService.createPost(this.postData).subscribe(
      (res) => {
        this.toasterMessage = 'Post created successfully';
        this.toasterType = 'success';

        this.postData.forEach((val, key, parent) => {
          this.postData.delete(key);
        });
      },
      (err) => {
        this.toasterMessage = 'Failed to create this post';
        this.toasterType = 'error';

        this.postData.forEach((val, key, parent) => {
          this.postData.delete(key);
        });
      }
    );
  }
}
