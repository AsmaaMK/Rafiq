import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { hosts } from 'src/environments/hosts';
import {
  CitySearch,
  CitySearchResponse,
  CitySearchResult,
  UserSearchResponse,
  UserSearchResult,
} from './search';

const headers = new HttpHeaders();
headers
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private url = `${environment.apiUrl}/api/v1/search`;

  constructor(private http: HttpClient) {}

  searchByImage(url: string, image: FormData): Observable<CitySearchResult[]> {
    const host = url.includes('http://localhost')
      ? hosts.localhost
      : hosts.remotehost;

    return this.http
      .post<CitySearchResponse>(`${host}/api/v1/search/image`, image, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          const searchResults: CitySearchResult[] = [];
          res.results.suggestions.forEach((result) => {
            searchResults.push({
              city: `${result.firstName} ${result.lastName}`,
              country: result.country.name,
              cityId: result._id,
              image: result.matchedImage,
              location: {
                lat: result.location.latitude,
                lng: result.location.longitude,
              },
            });
          });

          return searchResults;
        })
      );
  }

  searchUser(searchKeyWord: string): Observable<UserSearchResult[]> {
    return this.http
      .get<UserSearchResponse>(
        `${this.url}/liveSearch?type=user&q=${searchKeyWord}`,
        {
          headers: headers.append('content-type', 'application/json'),
        }
      )
      .pipe(
        map((res) => {
          const searchResults: UserSearchResult[] = [];
          res.results.suggestions.forEach((result) => {
            searchResults.push({
              name: `${result.firstName} ${result.lastName}`,
              username: result.userName,
              avatar: result.avatar,
            });
          });

          return searchResults;
        })
      );
  }

  searchCity(searchKeyWord: string): Observable<CitySearchResult[]> {
    return this.http
      .get<CitySearch>(`${this.url}/liveSearch?type=city&q=${searchKeyWord}`, {
        headers: headers.append('content-type', 'application/json'),
      })
      .pipe(
        map((res) => {
          const searchResults: CitySearchResult[] = [];
          res.results.suggestions.forEach((result) => {
            searchResults.push({
              city: `${result.firstName} ${result.lastName}`,
              country: result.country,
              cityId: +result._id,
              image: result.images[0],
              location: {
                lat: result.location.latitude,
                lng: result.location.longitude,
              },
            });
          });

          return searchResults;
        })
      );
  }
}
