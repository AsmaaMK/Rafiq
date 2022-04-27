import { Component, OnInit } from '@angular/core';
import { LatLng } from '../../../profile/pages/map/marker';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss'],
})
export class AttractionsComponent implements OnInit {
  attractions: Attraction[] = [
    {
      image: '../../../../../../../assets/main-module/post-images/Albania2.png',
      name: 'Trattoria Restaurant',
      description: `Trattoria Monti is one of the most popular restaurants with friendly service, charming ambiance and excellent food. Meats feature prominently in the menu. There are many vegetarian options as well.`,
      rate: 3,
      location: {
        lat: 23,
        lng: 34,
      },
      type: 'resturant',
    },
    {
      image: '../../../../../../../assets/main-module/city/1.jpg',
      name: 'Colosseum',
      description: `It's giant amphitheatre built in Rome under the Flavian emperors. it is located just east of the Palatine Hill, on the grounds of what was Nero's Golden House.`,
      rate: 4,
      location: {
        lat: 23,
        lng: 34,
      },
      type: 'touristic place',
    },
    {
      image: '../../../../../../../assets/main-module/post-images/Albania2.png',
      name: 'Trattoria Restaurant',
      description: `it is located just east of the Palatine Hill, on the grounds of what was Nero's Golden House.`,
      rate: 2,
      location: {
        lat: 23,
        lng: 34,
      },
      type: 'touristic place',
    },
    {
      image: '../../../../../../../assets/main-module/post-images/Albania2.png',
      name: 'Trattoria Restaurant',
      description: ` built in Rome under the Flavian emperors. it is located just east of the Palatine Hill, on the grounds of what was Nero's Golden House.`,
      rate: 5,
      location: {
        lat: 23,
        lng: 34,
      },
      type: 'resturant',
    },
  ];

  filteredAttractions: Attraction[] = [...this.attractions];

  constructor() {}

  ngOnInit(): void {
  }
  
  filterAttractionsArray(filterBtn: HTMLElement, filter: string) {
    const filterBtns = document.querySelectorAll<HTMLElement>('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.classList.remove('active');
    });

    filterBtn.classList.add('active');
    
    if (filter === 'all') {
      this.filteredAttractions = this.attractions;
    } else {
      this.filteredAttractions = [];
      for (let attraction of this.attractions) {
        if (attraction.type === filter)
          this.filteredAttractions.push(attraction);
      }
    }
  }
}

type Attraction = {
  image: string;
  name: string;
  description: string;
  rate: number;
  location: LatLng;
  type: 'resturant' | 'touristic place';
};
