import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  videos: string[] = [];
  userName = this.router.url.split('/')[3];
  constructor(private userService: UserInfoService, private router: Router) {}

  ngOnInit(): void {
    this.userService
      .getUserVideos(this.userName)
      .subscribe((res) => (this.videos = res));
  }
}
