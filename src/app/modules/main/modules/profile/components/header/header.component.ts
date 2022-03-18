import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfileInfo } from '../../models/user-profile-info';

@Component({
  selector: 'profile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  following = new BehaviorSubject(false);
  isMyProfile = true;

  user: UserProfileInfo = {
    following: this.following,

    personalImageURL: '../../../../../../../assets/main-module/profile/default-personal-image.svg',
    coverImageURL: '../../../../../../../assets/main-module/profile/default-cover.svg',

    name: 'Henry Roberts',
    username: 'Henry17',

    numberOfPosts: 3,
    numberOfFollowers: 2,
    from: 'Egypt',
    livesIn: 'Ismailia',

    socialLinks: [
      {
        link: '#',
        icon: '../../../../../../../assets/main-module/profile/insta.svg',
        label: 'instagram'
      }, {
        link: '#',
        icon: '../../../../../../../assets/main-module/profile/facebook.svg',
        label: 'facebook'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  followOrUnfollow() {
    this.following.next(!this.following.value);
  }

}