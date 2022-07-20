import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  images: string[] = [];
  userName = this.router.url.split('/')[3];
  constructor(private userService: UserInfoService, private router: Router) {}

  ngOnInit(): void {
    this.userService
      .getUserImages(this.userName)
      .subscribe((res) => (this.images = res));
  }
}
