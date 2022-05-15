import { Component, OnInit } from '@angular/core';
import { TripInfo } from '../../trip';

@Component({
  selector: 'app-trips-filter',
  templateUrl: './trips-filter.component.html',
  styleUrls: ['./trips-filter.component.scss'],
})
export class TripsFilterComponent implements OnInit {
  trips: TripInfo[] = [
    {
      city: 'Ismailia',
      country: 'Egypt',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptates
        nostrum necessitatibus! Voluptatem eligendi vitae temporibus in odio
        sunt! At saepe placeat voluptatibus alias ad minus necessitatibus
        mollitia ipsa facere.`,
      owner: {
        username: 'asmaamk',
        firstName: 'Asmaa',
        lastName: 'Mahmoud',
      },
      rate: 4,
      totalPrice: 300,
      transportation: 'Train',
      transportationPrice: 239,
      tripId: 'aaa',
      img: 'assets/main-module/trips/img.png',
    },
    {
      city: 'Ismailia',
      country: 'Egypt',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptates
        nostrum necessitatibus! Voluptatem eligendi vitae temporibus in odio
        sunt! At saepe placeat voluptatibus alias ad minus necessitatibus
        mollitia ipsa facere.`,
      owner: {
        username: 'asmaamk',
        firstName: 'Asmaa',
        lastName: 'Mahmoud',
      },
      rate: 4,
      totalPrice: 300,
      transportation: 'Train',
      transportationPrice: 239,
      tripId: 'aaa',
      img: 'assets/main-module/trips/img.png',
    },
    {
      city: 'Ismailia',
      country: 'Egypt',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptates
        nostrum necessitatibus! Voluptatem eligendi vitae temporibus in odio
        sunt! At saepe placeat voluptatibus alias ad minus necessitatibus
        mollitia ipsa facere.`,
      owner: {
        username: 'asmaamk',
        firstName: 'Asmaa',
        lastName: 'Mahmoud',
      },
      rate: 4,
      totalPrice: 300,
      transportation: 'Train',
      transportationPrice: 239,
      tripId: 'aaa',
      img: 'assets/main-module/trips/img.png',
    },
    {
      city: 'Ismailia',
      country: 'Egypt',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptates
        nostrum necessitatibus! Voluptatem eligendi vitae temporibus in odio
        sunt! At saepe placeat voluptatibus alias ad minus necessitatibus
        mollitia ipsa facere.`,
      owner: {
        username: 'asmaamk',
        firstName: 'Asmaa',
        lastName: 'Mahmoud',
      },
      rate: 4,
      totalPrice: 300,
      transportation: 'Train',
      transportationPrice: 239,
      tripId: 'aaa',
      img: 'assets/main-module/trips/img.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
