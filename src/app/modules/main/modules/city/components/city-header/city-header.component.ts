import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToasterType } from 'src/app/shared/models/toaster-status';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-city-header',
  templateUrl: './city-header.component.html',
  styleUrls: ['./city-header.component.scss'],
})
export class CityHeaderComponent implements OnInit {
  showToast = false;
  toastStatus: ToasterType = 'error';
  toastMessage = '';
  defaultCoverImage: any;

  constructor(
    
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
  
  ) {}

  ngOnInit(): void {
    
    this.closePopupOnClick();
  }

  ngAfterViewChecked() {
    const cityCoverHeight = document.getElementById('city-cover')?.getBoundingClientRect().height;
    const cityHeader = document.querySelector<HTMLElement>('.city-header');
    if (cityCoverHeight && cityHeader) {
      cityHeader.style.paddingTop = (cityCoverHeight * 0.75).toString() + 'px';
    }
  }

  changeCover(event: any, popup: HTMLElement) {
    this.closePopup(popup);

    const newCover = event.target.files[0];
    const formData = new FormData();
    formData.append('cover', newCover, newCover.name);
    // this.userInfoService.changeCover(formData).subscribe((res) => {
    //   this.userInfo.cover = res.cover;
    // });
  }

  deleteCover(popup: HTMLElement) {
    this.closePopup(popup);
    // this.userInfoService.deleteCover().subscribe(() => {
    //   this.userInfo.cover = this.defaultCoverImage;
    // });
  }

  followOrUnfollow() {
    // this.isFollowing.value ? this.unfollow() : this.follow();
  }

  follow() {
    // this.followingService.follow(this.urlUserName).subscribe(
    //   (res) => {
    //     this.toastMessage = res.results.message;
    //     this.toastStatus = 'success';
    //     this.showToast = true;
    //     this.isFollowing.next(true);
    //   },
    //   (err) => {
    //     this.toastMessage = err.error.error.message;
    //     this.toastStatus = 'error';
    //     this.showToast = true;
    //   }
    // );
  }

  unfollow() {
    // this.followingService.unfollow(this.urlUserName).subscribe(
    //   (res) => {
    //     this.toastMessage = res.results.message;
    //     this.toastStatus = 'success';
    //     this.showToast = true;
    //     this.isFollowing.next(false);
    //   },
    //   (err) => {
    //     this.toastMessage = err.error.error.message;
    //     this.toastStatus = 'error';
    //     this.showToast = true;
    //   }
    // );
  }

  openPopup(popup: HTMLElement) {
    document.body.classList.add('popup-open');
    popup.classList.add('open');
  }

  closePopup(popup: HTMLElement) {
    document.body.classList.remove('popup-open');
    popup.classList.remove('open');
  }

  viewPicture(imgPopup: HTMLElement, optionsPopup: HTMLElement) {
    document.body.classList.add('popup-open');
    imgPopup.classList.add('open');
    optionsPopup.classList.remove('open');
  }

  onCoverClick(coverOptions: HTMLElement, coverPreview: HTMLElement) {
    // if (this.isMyProfile.value) this.openPopup(coverOptions);
    // else if (this.userInfo.cover !== this.defaultCoverImage)
    //   this.viewPicture(coverPreview, coverOptions);
  }

  closePopupOnClick() {
    const coverPopup = document.getElementById('cover-options-popup');
    const avatarPopup = document.getElementById('avatar-options-popup');

    coverPopup?.addEventListener('click', (event) => {
      if (event.target === coverPopup) {
        document.body.classList.remove('popup-open');
        coverPopup.classList.remove('open');
      }
    });
    avatarPopup?.addEventListener('click', (event) => {
      if (event.target === avatarPopup) {
        document.body.classList.remove('popup-open');
        avatarPopup.classList.remove('open');
      }
    });
  }
}
