import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfo } from '../../models/user-info';
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

  isMyProfile = this.urlUserName === this.myUserName;

  defaultPersonalImage =
    'assets/main-module/profile/default-personal-image.svg';
  defaultCoverImage = 'assets/main-module/profile/default-cover.svg';

  userInfo!: UserInfo;

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
    // allow different usernames in route to have different routes
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // get user info
    this.activatedRoute.data.subscribe((res) => {
      this.userInfo = res['userInfo'];
      if (this.isMyProfile) this.userInfoService.myProfileInfo = this.userInfo;
      console.log(this.userInfoService.myProfileInfo);
    });

    // get cover and avatar
    
    if (this.isMyProfile && this.userInfoService.myAvatar.value !== '') {
      console.log('my profile and avatar found');
      this.avatar.next(this.userInfoService.myAvatar.value);
      this.cover.next(this.userInfoService.myCover.value);
      console.log('AVATAR', this.userInfoService.myAvatar);
    } else if (this.isMyProfile) {
      console.log('my profile but avatar not found');
      this.userInfoService.myAvatar.next(this.getAvatar());
      this.userInfoService.myCover.next(this.getCover());
      console.log('AVATAR', this.userInfoService.myAvatar.value);
    } else {
      console.log('not my profile');
      this.getAvatar();
      this.getCover();
    }
  }

  changeCover(event: any) {
    const newCover = event.target.files[0];
    const formData = new FormData();
    formData.append('cover', newCover, newCover.name);
    this.userInfoService.changeCover(formData).subscribe((res) => {
      this.cover.next(res.cover);
      this.userInfoService.myCover = res.cover;
    });
  }

  getCover(): string {
    let cover = '';
    this.userInfoService.getCover(this.myUserName).subscribe((res) => {
      this.cover.next(res.cover);
      cover = res.vover;
    });

    return cover;
  }

  deleteCover() {
    this.userInfoService.deleteCover().subscribe(() => {
      this.cover.next(this.defaultCoverImage);
      this.userInfoService.myCover.next('');
    });
  }

  changeAvatar(event: any) {
    const newAvatar = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', newAvatar, newAvatar.name);
    this.userInfoService.changeAvatar(formData).subscribe((res) => {
      this.avatar.next(res.avatar);
      this.userInfoService.myAvatar = res.avatar;
    });
  }

  getAvatar(): string {
    let avatar = '';
    this.userInfoService.getAvatar(this.myUserName).subscribe((res) => {
      this.avatar.next(res.avatar);
      avatar = res.avatar;
    });

    return avatar;
  }

  deleteAvatar() {
    this.userInfoService.deleteAvatar().subscribe(() => {
      this.avatar.next(this.defaultPersonalImage);
      this.userInfoService.myAvatar.next('');
    });
  }

  followOrUnfollow() {
    this.following.next(!this.following.value);
  }
}
