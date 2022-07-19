import { Component, OnInit } from '@angular/core';
import { TripInfo } from '../../trip';

@Component({
  selector: 'app-trips-filter',
  templateUrl: './trips-filter.component.html',
  styleUrls: ['./trips-filter.component.scss'],
})
export class TripsFilterComponent implements OnInit {
  trips: TripInfo[] = [];
  selectedFilter = '';

  constructor() {}

  ngOnInit(): void {
  }
  
  selectFilter(value: any) {
    this.selectedFilter = value;
    console.log(this.selectedFilter);
    this.trips = [
      {
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
      {
        city: 'Ismailia',
        country: 'Egypt',
        description: `Ismailia is a city in north-eastern Egypt. Situated on the west bank of the Suez Canal, it is the capital of the Ismailia Governorate.`,
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
        img: 'assets/main-module/trips/img3.webp',
      },
      {
        city: 'Giza',
        country: 'Egypt',
        description: `Giza is an Egyptian city on the west bank of the Nile, near Cairo. The Giza Plateau is home to iconic Egyptian monuments, including 3 tall pyramids built as royal mausoleums around the 26th century B.C. The largest, the Great Pyramid, is King Khufu’s tomb. The Great Sphinx is a vast sculpture of a man’s head on a lion’s body. The Solar Boat Museum displays a restored cedar barge found buried near the Great Pyramid.`,
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
        img: 'assets/main-module/trips/img2.jpg',
      },
    ];
  }
}
