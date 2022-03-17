import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfileInfo } from '../../models/user-profile-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  following = new BehaviorSubject(false);
  isMyProfile = true;

  user: UserProfileInfo = {
    following: this.following,

    personalImageURL: 'https://images.unsplash.com/photo-1583760919595-270997d7726a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    coverImageURL: '../../../../../../../assets/main-module/profile/cover.jpg',

    name: 'Henry Roberts',
    username: 'Henry17',

    numberOfPosts: 3,
    numberOfFollowers: 2,
    from: 'Egypt',
    livesIn: 'Ismailia',

    socialLinks: [
      {
        link: '#',
        icon: '../../../../../../../assets/main-module/profile/insta.svg'
      }, {
        link: '#',
        icon: '../../../../../../../assets/main-module/profile/facebook.svg'
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