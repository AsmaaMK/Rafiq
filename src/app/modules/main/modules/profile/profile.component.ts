import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { EditInfoService } from './services/edit-info.service';
import { UserInfoService } from './services/user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  
  urlUserName = this.route.url.split('/')[3];
  myUserName = this.userInfoService.myUserName;
  isMyProfile = this.urlUserName === this.myUserName;

  showEditInfo = this.editInfoService.showEditInfo;

  constructor(
    private userInfoService: UserInfoService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private editInfoService: EditInfoService
  ) {}

  ngOnInit(): void {
    if (!this.isMyProfile) this.showEditInfo.next(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.possitionNavbar();
  }

  ngAfterViewInit() {
    this.possitionNavbar();
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
