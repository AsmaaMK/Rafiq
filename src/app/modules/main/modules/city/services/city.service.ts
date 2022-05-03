import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ActivitiesData,
  Activity,
  GetActivitiesResponse,
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

  getCityInfo(cityId: string) {
    this.http.get(`${this.url}/${cityId}`, { headers: headers });
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
            };
            transformedActivities.push(activity);
          });

          return transformedActivities;
        })
      );
  }

  getHotels(cityId: string, paramsList: { key: string; value: string }[]) {
    const params = new HttpParams();
    paramsList.forEach((param) => {
      params.append(param.key, param.value);
    });
    this.http.get(`${this.url}/${cityId}/activities`, {
      headers: headers,
      params: params,
    });
  }
}
