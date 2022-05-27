import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit {
  username = this.userInfoService.myUserName.value;
  constructor(
    private notificationService: NotificationService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {}

  toggleNotificationView() {
    this.notificationService.toggleNotificationView();
  }
}
