import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  images: string[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i <= 100; i++) {
      this.images.push(`image ${i}`);
    }
  }

}
