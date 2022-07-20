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
      city: 'Aswan',
      country: 'Egypt',
      description: `Aswan is known for its beautiful Nile Valley scenery, significant archaeological sites and its peaceful aura. Its weather is warm all year round, which makes it a perfect winter destination.`,
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
        place: 'Full-Day Guided Tour of Abu Simbel Temples',
        price: 50,
        description: `
Aswan: Full-Day Guided Tour of Abu Simbel Temples
Explore the 2 temples of Abu Simbel, on this full-day tour of the Nubian Monuments. Learn about the fascinating history of Egyptian Pharaoh Ramses II from your expert local guide.`,
      },
      {
        place: 'Boat Trip to the Nubian Village',
        price: 250,
        description: `
Aswan: Boat Trip to the Nubian Village
Take a trip through the Nile to visit the Nubian village. Experience the local life, enjoy a Nubian drink in one of the houses and get to pet the crocodiles.`,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
