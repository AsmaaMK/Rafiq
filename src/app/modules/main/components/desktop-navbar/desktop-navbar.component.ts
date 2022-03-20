import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.scss']
})
export class DesktopNavbarComponent implements OnInit {

  username = this.tokenStorageService.getUsername();

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logoutUser();
  }

}
