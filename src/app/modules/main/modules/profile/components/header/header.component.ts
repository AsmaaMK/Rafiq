import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfo, UserInfoResponse } from '../../models/user-profile-info';
import { ProfileInfoService } from '../../services/profile-info.service';

@Component({
  selector: 'profile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  following = new BehaviorSubject(false);
  isMyProfile = true;

  userInfoLoaded = new BehaviorSubject(false);

  userName = this.router.url.split('/')[3];
  user: User = {
    userName: this.userName,
    userInfo: {
      firstName: '',
      lastName: '',
      country: '',
      livesIn: '',
      numberOfPosts: 0,
    },
    personalImage: 'assets/main-module/profile/default-personal-image.svg',
    coverImage: 'assets/main-module/profile/default-cover.svg',
  };

  constructor(
    private profileInfoService: ProfileInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userInfoLoaded.value === false) {
      this.profileInfoService.getUserInfo(this.userName).subscribe(
        (res) => {
          console.log(res);
          this.user.userInfo.firstName = res.results.firstName;
          this.user.userInfo.lastName = res.results.lastName;
          this.user.userInfo.country = res.results.country;
          console.log(this.user);
          this.userInfoLoaded.next(true);
        },
        (err) => console.warn(err)
      );
    }
  }

  followOrUnfollow() {
    this.following.next(!this.following.value);
  }

  ngAfterViewInit() {
    this.possitionNavbar();
    console.log('hey there is a change');
  }

  /**
   * calculate the button offset of the card info and cover to possition the navbar dynamically
   * the calculation must be after the view init because the card height is not specified in css
   */
  possitionNavbar(): void {
    let profileCard = document.getElementById('profile-info-card');
    let profileCover = document.getElementById('profile-cover');
    let profileNav = document.getElementById('profile-navbar');

    let profileCardBottom = 0;
    let profileCoverBottom = 0;
    let profileNavMarginTop = 0;
    let navbarMarginTop = 0;

    if (profileCard && profileCover) {
      profileCardBottom = profileCard.getBoundingClientRect().bottom;
      profileCoverBottom = profileCover.getBoundingClientRect().bottom;
    }

    if (profileCardBottom && profileCoverBottom) {
      profileNavMarginTop = profileCardBottom - profileCoverBottom;
    }

    if (profileNavMarginTop && profileNav) {
      navbarMarginTop = profileNavMarginTop + 20;
      profileNav.style.marginTop = navbarMarginTop.toString() + 'px';
    }
  }
}

interface User {
  userName: string;

  userInfo: {
    firstName: string,
    lastName: string,
    country: string,
    livesIn: string,
    numberOfPosts: number,
  };

  personalImage: string;
  coverImage: string;
}