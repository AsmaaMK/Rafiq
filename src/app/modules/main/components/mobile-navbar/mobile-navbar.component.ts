import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent implements OnInit {

  username = this.tokenStorageService.getUsername();

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {}

}
