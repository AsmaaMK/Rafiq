import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LatLng } from '../../../profile/pages/map/marker';
import { Activity } from '../../models/city';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss'],
})
export class AttractionsComponent implements OnInit {
  activities!: Activity[];
  cityId = this.router.url.split('/')[3];
  loading = true;

  constructor(private router: Router, private cityService: CityService) {}

  ngOnInit(): void {
    this.cityService.getActivities(this.cityId).subscribe((res) => {
      this.activities = res;
      this.loading = false;
    });
  }
}
