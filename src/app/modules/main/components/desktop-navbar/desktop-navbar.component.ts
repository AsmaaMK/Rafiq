import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.scss'],
})
export class DesktopNavbarComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    public userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logoutUser();
  }

  toggleNotificationView() {
    this.notificationService.toggleNotificationView();
  }
}
