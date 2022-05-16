import { Component, OnInit } from '@angular/core';
import { TripDay, TripInfo } from '../../trip';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent implements OnInit {
  trip: {
    tripInfo: TripInfo;
    days: TripDay[];
  } = {
    tripInfo: {
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
    days: [
      {
        place: 'Abu Simbel',
        price: 50,
        description: `Built by Ramses II, and saved from destruction by a remarkable UNESCO rescue project in the 1970s, Abu Simbel is not only a triumph of ancient architecture, but also of modern engineering.`,
      },
      {
        place: 'Abu Simbel',
        price: 50,
        description: `Built by Ramses II, and saved from destruction by a remarkable UNESCO rescue project in the 1970s, Abu Simbel is not only a triumph of ancient architecture, but also of modern engineering.`,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
