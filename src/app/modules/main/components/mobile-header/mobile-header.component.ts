import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent implements OnInit {
  constructor(private auhtService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.auhtService.logoutUser();
  }
}
