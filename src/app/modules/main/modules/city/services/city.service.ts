import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ActivitiesData,
  Activity,
  CityInfo,
  GetActivitiesResponse,
  GetCityInfoResponse,
  GetHotelsResponse,
  Hotel,
} from '../models/city';

const headers = new HttpHeaders();
headers
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

@Injectable({
  providedIn: 'root',
})
export class CityService {
  url = `${environment.apiUrl}/api/v1/cities`;
  constructor(private http: HttpClient) {}

  getCityInfo(cityId: string): Observable<CityInfo> {
    return this.http
      .get<GetCityInfoResponse>(`${this.url}/${cityId}`, { headers: headers })
      .pipe(
        map((res) => {
          let cityInfo: CityInfo = {
            name: `${res.results.firstName} ${res.results.lastName}`,
            cover: res.results.images[0],
            timeZone: res.results.timeZone,
            country: {
              name: res.results.country.name,
              emergencyNumbers: res.results.country.emergencyNumbers,
            },
            images: res.results.images,
            population: 0, // TODO: make it dynamic
            temperature: 50, // TODO: make it dynamic
          };

          return cityInfo;
        })
      );
  }

  getActivities(cityId: string): Observable<Activity[]> {
    return this.http
      .get<GetActivitiesResponse>(`${this.url}/${cityId}/activities`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          let transformedActivities: Activity[] = [];
          const activities = res.results.data;

          activities.forEach((act) => {
            const activity: Activity = {
              name: act.name,
              bookingLink: act.bookingLink,
              geoCode: act.geoCode,
              picture: act.pictures[0],
              rating: act.rating,
              shortDescription: act.shortDescription,
              price: act.price.amount,
            };
            transformedActivities.push(activity);
          });

          return transformedActivities;
        })
      );
  }

  getHotels(
    cityId: string,
    paramsList: { key: string; value: string }[]
  ): Observable<Hotel[]> {
    let url = `${this.url}/${cityId}/hotels?`;
    paramsList.forEach((param) => {
      url += `${param.key}=${param.value}&`;
    });
    url = url.slice(0, url.length - 1);

    return this.http
      .get<GetHotelsResponse>(url, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          const hotels: Hotel[] = [];

          for (let hotel of res.results.data) {
            hotels.push({
              name: hotel.hotel_name,
              address: hotel.address,
              bookingLink: hotel.url,
              image: hotel.max_1440_photo_url,
              numberOfReviews: hotel.review_nr,
              price: hotel.min_total_price,
              reviewScore: hotel.review_score,
              reviewScoreWord: hotel.review_score_word,
            });
          }

          return hotels;
        })
      );
  }
}
