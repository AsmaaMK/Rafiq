import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfo, UserProfile } from '../../models/user-info';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'profile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  following = new BehaviorSubject(false);

  urlUserName = this.route.url.split('/')[3];
  myUserName = this.tokenStorageService.getUsername();

  isMyProfile = new BehaviorSubject(this.urlUserName === this.myUserName);

  defaultPersonalImage =
    'assets/main-module/profile/default-personal-image.svg';
  defaultCoverImage = 'assets/main-module/profile/default-cover.svg';

  userInfo!: UserProfile;

  constructor(
    private userInfoService: UserInfoService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    public formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  cover = new BehaviorSubject(this.defaultCoverImage);
  avatar = new BehaviorSubject(this.defaultPersonalImage);

  ngOnInit(): void {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // get user info
    this.activatedRoute.data.subscribe((res) => {
      this.userInfo = res['userInfo'];
      if (this.userInfo.cover === null)
        this.userInfo.cover = this.defaultCoverImage;
      
      if (this.userInfo.avatar === null)
        this.userInfo.avatar = this.defaultPersonalImage;
      // if (this.isMyProfile.value) this.userInfoService.myProfileInfo = this.userInfo;
      // console.log(this.userInfoService.myProfileInfo);
    });

    // this.getAvatar();
    // this.getCover();

    this.userInfoService
      .getNumberOfFollowers(this.urlUserName)
      .subscribe((res) => console.log(res));

    if (!this.isMyProfile.value) {
      this.userInfoService
        .getIsFollowed(this.urlUserName)
        .subscribe((res) => console.log(res));
    }
  }

  changeCover(event: any, popup: HTMLElement) {
    this.closePopup(popup);

    const newCover = event.target.files[0];
    const formData = new FormData();
    formData.append('cover', newCover, newCover.name);
    this.userInfoService.changeCover(formData).subscribe((res) => {
      this.cover.next(res.cover);
      // this.userInfoService.myCover = res.cover;
    });
  }

  getCover(): string {
    let cover = '';
    this.userInfoService.getCover(this.urlUserName).subscribe((res) => {
      if (res.cover) {
        this.cover.next(res.cover);
        cover = res.cover;
      }
    });

    return cover;
  }

  deleteCover(popup: HTMLElement) {
    this.closePopup(popup);
    this.userInfoService.deleteCover().subscribe(() => {
      this.cover.next(this.defaultCoverImage);
      // this.userInfoService.myCover.next('');
    });
  }

  changeAvatar(event: any, popup: HTMLElement) {
    this.closePopup(popup);

    const newAvatar = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', newAvatar, newAvatar.name);
    this.userInfoService.changeAvatar(formData).subscribe((res) => {
      this.avatar.next(res.avatar);
      // this.userInfoService.myAvatar = res.avatar;
    });
  }

  getAvatar(): string {
    let avatar = '';
    this.userInfoService.getAvatar(this.urlUserName).subscribe((res) => {
      if (res.avatar) {
        this.avatar.next(res.avatar);
        avatar = res.avatar;
      }
    });

    return avatar;
  }

  deleteAvatar(popup: HTMLElement) {
    this.closePopup(popup);
    this.userInfoService.deleteAvatar().subscribe(() => {
      this.avatar.next(this.defaultPersonalImage);
      // this.userInfoService.myAvatar.next('');
    });
  }

  followOrUnfollow() {
    this.following.next(!this.following.value);
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
    if (this.isMyProfile.value)
      this.openPopup(coverOptions);
    else if (this.cover.value !== this.defaultCoverImage)
      this.viewPicture(coverPreview, coverOptions);
  }

  onAvatarClick(avatarOptions: HTMLElement, avatarPreview: HTMLElement) {
    if (this.isMyProfile.value)
      this.openPopup(avatarOptions);
    else if (this.avatar.value !== this.defaultPersonalImage)
      this.viewPicture(avatarPreview, avatarOptions);
  }
}
