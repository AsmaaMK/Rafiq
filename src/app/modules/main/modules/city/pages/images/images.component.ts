import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  images!: string[];
  cityId!: string;
  showSpinner = true;
  
  constructor(private cityService: CityService, private router: Router) {}

  ngOnInit(): void {
    this.cityId = this.router.url.split('/')[3];
    this.cityService.getCityInfo(this.cityId).subscribe((res) => {
      this.images = res.images;
      this.showSpinner = false;
    });
  }
}
