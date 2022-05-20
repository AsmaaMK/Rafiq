import { Component, OnInit } from '@angular/core';
import { CitySearchResult, UserSearchResult } from './search';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchType = 'Users';
  citySearchResults: CitySearchResult[] = [
    {
      city: 'cairo',
      country: 'egypt',
      cityId: 123,
      image: '../../../../../assets/main-module/search/img.png',
      location: {
        lat: 0,
        lng: 0,
      },
    },
    {
      city: 'cairo',
      country: 'egypt',
      cityId: 123,
      image: '../../../../../assets/main-module/search/img.png',
      location: {
        lat: 0,
        lng: 0,
      },
    },
  ];

  userSearchResults: UserSearchResult[] = [
    {
      name: 'Asmaa Mahmoud',
      username: 'asmaamk',
      avatar: '../../../../../assets/main-module/search/img.png',
    },
    {
      name: 'Asmaa Mahmoud',
      username: 'asmaamk',
      avatar: '../../../../../assets/main-module/search/img.png',
    },
  ];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  searchByImage(event: any) {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('query', image);

    this.searchService
      .searchByImage(formData)
      .subscribe((res) => (this.citySearchResults = res));
  }

  setSearchType(searchType: string) {
    this.searchType = searchType;
    this.citySearchResults = [];
    this.userSearchResults = [];
  }

  onTyping(searchKeyWord: string) {
    this.searchType === ' Users '
      ? this.searchService
          .searchUser(searchKeyWord)
          .subscribe((res) => (this.userSearchResults = res))
      : this.searchService
          .searchCity(searchKeyWord)
          .subscribe((res) => (this.citySearchResults = res));
  }
}
