import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marker, MarkerData } from './marker';

let fakeId = '';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getAllMarkers(): Marker[] {
    // TODO: send get reuqest and return array of markers from the response
    return [
      { id: 'asfsfsdf', type: 'visited', possition: { lat: 50.254540, lng: 54.5456440 } },
      { id: 'dfsfasffs', type: 'wish', possition: { lat: 30.254540, lng: -10.5456440 } },
      { id: 'sdffffadfff', type: 'visited', possition: { lat: 30.339090792540066, lng: 31.236435722855088 } },
      { id: 'sdfasfffffff', type: 'wish', possition: { lat: 10.254540, lng: 34.5456440 } }
    ];
  }

  // TODO: subscribe to that request in mapInit to call create marker only if the request success
  addMarker(markerData: MarkerData): string {
    // TODO: send post request to the backend and get the marker id from the response
    // TODO: return the observable to subuscribe in the component
    fakeId = fakeId + 'a';
    return fakeId;
  }

  deleteMarker(markerId: string): boolean {
    // TODO: send delete request
    // TODO: return the observable to subuscribe in the component
    return true;
  }
}
