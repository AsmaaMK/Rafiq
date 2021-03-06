import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
import { ToasterType } from 'src/app/shared/models/toaster-status';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserProfile } from '../../models/user-info';
import { EditInfoService } from '../../services/edit-info.service';
import { FollowingsService } from '../../services/followings.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'profile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isFollowing = new BehaviorSubject(false);

  urlUserName = this.route.url.split('/')[3];

  isMyProfile = new BehaviorSubject(
    this.urlUserName === this.userInfoService.myUserName.value
  );

  defaultPersonalImage =
    'assets/main-module/profile/default-personal-image.svg';
  defaultCoverImage = 'assets/main-module/profile/default-cover.svg';
  showCoverSpinner = false;
  showAvatarSpinner = false;

  userInfo!: UserProfile;

  socialIcons = {
    facebook: '../../../../../../../assets/main-module/profile/facebook.svg',
    instagram: '../../../../../../../assets/main-module/profile/insta.svg',
    youtube: '../../../../../../../assets/main-module/profile/youtube.svg',
    tiktok: '../../../../../../../assets/main-module/profile/tiktok.svg',
  };

  constructor(
    private userInfoService: UserInfoService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private followingService: FollowingsService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    // this.route.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };

    // get user info
    this.activatedRoute.data.subscribe((res) => {
      this.userInfo = res['userInfo'];

      if (!this.isMyProfile.value) {
        this.followingService
          .getIsFollowed(this.urlUserName)
          .subscribe((res) => {
            this.isFollowing.next(res.results.isFollowing);
            console.log(this.isFollowing.value);
          });
      }

      if (this.isMyProfile.value) {
        this.userInfoService.myInfo.next(this.userInfo);
      }

      if (this.userInfo.cover === null)
        this.userInfo.cover = this.defaultCoverImage;

      if (this.userInfo.avatar === null)
        this.userInfo.avatar = this.defaultPersonalImage;
    });

    this.closePopupOnClick();
  }

  changeCover(event: any, popup: HTMLElement) {
    this.closePopup(popup);
    this.showCoverSpinner = true;

    const newCover = event.target.files[0];
    const formData = new FormData();
    formData.append('cover', newCover, newCover.name);
    this.userInfoService.changeCover(formData).subscribe((res) => {
      this.showCoverSpinner = false;
      this.userInfo.cover = res.cover;
    });
  }

  deleteCover(popup: HTMLElement) {
    this.closePopup(popup);
    this.userInfoService.deleteCover().subscribe(() => {
      this.userInfo.cover = this.defaultCoverImage;
    });
  }

  changeAvatar(event: any, popup: HTMLElement) {
    this.closePopup(popup);
    this.showAvatarSpinner = true;

    const newAvatar = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', newAvatar, newAvatar.name);
    this.userInfoService.changeAvatar(formData).subscribe((res) => {
      this.showAvatarSpinner = false;
      this.userInfo.avatar = res.avatar;
    });
  }

  deleteAvatar(popup: HTMLElement) {
    this.closePopup(popup);
    this.userInfoService.deleteAvatar().subscribe(() => {
      this.userInfo.avatar = this.defaultPersonalImage;
    });
  }

  followOrUnfollow() {
    this.isFollowing.value ? this.unfollow() : this.follow();
  }

  follow() {
    this.followingService.follow(this.urlUserName).subscribe(
      (res) => {
        this.toasterService.showToaster('success', res.results.message);
        this.isFollowing.next(true);
      },
      (err) => {
        this.toasterService.showToaster('error', err.error.error.message);
      }
    );
  }

  unfollow() {
    this.followingService.unfollow(this.urlUserName).subscribe(
      (res) => {
        this.toasterService.showToaster('success', res.results.message);
        this.isFollowing.next(false);
      },
      (err) => {
        this.toasterService.showToaster('error', err.error.error.message);
      }
    );
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
    if (this.isMyProfile.value) this.openPopup(coverOptions);
    else if (this.userInfo.cover !== this.defaultCoverImage)
      this.viewPicture(coverPreview, coverOptions);
  }

  onAvatarClick(avatarOptions: HTMLElement, avatarPreview: HTMLElement) {
    if (this.isMyProfile.value) this.openPopup(avatarOptions);
    else if (this.userInfo.avatar !== this.defaultPersonalImage)
      this.viewPicture(avatarPreview, avatarOptions);
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
