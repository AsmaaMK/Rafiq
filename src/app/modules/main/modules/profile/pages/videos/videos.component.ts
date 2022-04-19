import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videos: number[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i <= 10; i++) {
      this.videos.push(1);
    }
  }

}
