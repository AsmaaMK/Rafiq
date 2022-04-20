import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfoService } from '../../modules/profile/services/user-info.service';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit {
  username = this.userInfoService.myUserName;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {}
}
