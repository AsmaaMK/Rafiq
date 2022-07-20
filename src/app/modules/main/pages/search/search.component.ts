import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitySearchResult, UserSearchResult } from './search';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchType = ' Users ';
  citySearchResults: CitySearchResult[] = [];
  userSearchResults: UserSearchResult[] = [];
  searching = false;

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {}

  searchByImage(event: any) {
    this.searching = true;
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('query', image);

    const url = window.location.href;

    this.searchService.searchByImage(url, formData).subscribe((res) => {
      this.citySearchResults = res;
      event.target.value = '';
      this.searching = false;
    });
  }

  setSearchType(searchType: string) {
    this.searchType = searchType;
    this.citySearchResults = [];
    this.userSearchResults = [];
  }

  onTyping(searchKeyWord: string) {
    this.searching = true;

    this.searchType === ' Users '
      ? this.searchService.searchUser(searchKeyWord).subscribe((res) => {
          this.userSearchResults = res;
          this.searching = false;
        })
      : this.searchService.searchCity(searchKeyWord).subscribe((res) => {
          this.citySearchResults = res;
          this.searching = false;
        });
  }
}
