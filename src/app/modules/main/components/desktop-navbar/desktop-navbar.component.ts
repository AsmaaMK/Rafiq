import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfoService } from '../../modules/profile/services/user-info.service';

@Component({
  selector: 'app-desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.scss'],
})
export class DesktopNavbarComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    public userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logoutUser();
  }
}
