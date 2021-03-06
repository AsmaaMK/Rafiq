import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
import { ToasterType } from 'src/app/shared/models/toaster-status';
import { PostService } from '../../shared/components/post/post.service';
import { NotificationService } from './components/notification/notification.service';
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

  creatingPost = false;
  postDataForm!: FormGroup;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.possitionAddPostButton();
  }

  constructor(
    private userInfoService: UserInfoService,
    private postService: PostService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.userInfoService
      .getUserProfile(this.userInfoService.myUserName.value)
      .subscribe((res) => {
        this.userInfoService.myInfo.next(res);
      });

    this.postDataForm = new FormGroup({
      images: new FormControl(''),
      video: new FormControl(''),
      text: new FormControl(''),
    });

    this.listenToBodyClicks();
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

  createPost(postTextArea: HTMLTextAreaElement, popup: HTMLElement) {
    this.toasterService.showToaster('uploading', 'uploading post files');
    this.closePopup(popup);

    this.postData.append('text', postTextArea.value);
    this.postService.createPost(this.postData).subscribe(
      (res) => {
        this.toasterService.showToaster('success', 'Post created successfully');

        this.postData.forEach((val, key, parent) => {
          this.postData.delete(key);
        });
      },
      (err) => {
        this.toasterService.showToaster('error', 'Failed to create this post');

        this.postData.forEach((val, key, parent) => {
          this.postData.delete(key);
        });
      }
    );
  }

  listenToBodyClicks() {
    document.addEventListener('click', (e: any) => {
      const isClosest = e.target.closest('.notification-container');

      // if (!isClosest && this.notificationService.isOpen() === true) {
      //   this.notificationService.closeNotification();
      // }
    });
  }
}
