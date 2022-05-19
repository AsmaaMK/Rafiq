import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchType = 'Users';
  searchResults = [
    {
      cityId: '1608618140',
      country: 'Egypt',
      city: 'Cairo',
      location: {
        lng: 123,
        lat: 240,
      },
      image: '../../../../../assets/main-module/search/img.png',
    },
    {
      country: 'Egypt',
      city: 'Cairo',
      location: {
        lng: 123,
        lat: 240,
      },
      image: '../../../../../assets/main-module/search/img.png',
    },
    {
      country: 'Egypt',
      city: 'Cairo',
      location: {
        lng: 12,
        lat: 240,
      },
      image: '../../../../../assets/main-module/search/img.png',
    },
    {
      country: 'Egypt',
      city: 'Cairo',
      location: {
        lng: 123,
        lat: 240,
      },
      image: '../../../../../assets/main-module/search/img.png',
    },
    {
      country: 'Egypt',
      city: 'Cairo',
      location: {
        lng: 123,
        lat: 240,
      },
      image: '../../../../../assets/main-module/search/img.png',
    },
  ];

  constructor() {}

  setSearchType(searchType: string) {
    this.searchType = searchType;
  }

  ngOnInit(): void {}
}
