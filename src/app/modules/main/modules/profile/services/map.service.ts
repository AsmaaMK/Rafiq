import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarkerData } from '../pages/map/marker';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserInfoService } from './user-info.service';

const headers = new HttpHeaders();
headers
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private url = `${environment.apiUrl}/api/v1`;
  
  constructor(
    private http: HttpClient,
    private userInfoService: UserInfoService
  ) {}

  getAllMarkers(username: string) {
    return this.http.get<any>(`${this.url}/users/${username}/lists/travelMap`, {
      headers: headers,
    });
  }

  addMarker(markerData: MarkerData) {
    return this.http.post<any>(
      `${this.url}/users/${this.userInfoService.myUserName.value}/lists/travelMap`,
      {
        type: markerData.type,
        latitude: markerData.possition.lat,
        longitude: markerData.possition.lng,
      },
      { headers: headers }
    );
  }

  deleteMarker(markerId: string) {
    return this.http.delete(
      `${this.url}/users/${this.userInfoService.myUserName.value}/lists/travelMap`,
      {
        body: {
          _id: markerId,
        },
      }
    );
  }
}
