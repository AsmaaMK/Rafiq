import { Component, Input, OnInit } from '@angular/core';
import { TripInfo } from '../../trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  @Input() tripInfo!: TripInfo;

  constructor() {}

  ngOnInit(): void {}
}
