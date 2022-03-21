import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

const initMarkares: Marker[] = [
  { type: 'visited', possition: { lat: 50.254540, lng: 54.5456440 } },
  { type: 'wish', possition: { lat: 30.254540, lng: -10.5456440 } },
  { type: 'visited', possition: { lat: 30.339090792540066, lng: 31.236435722855088 } },
  { type: 'wish', possition: { lat: 10.254540, lng: 34.5456440 } }
];

const markers: google.maps.Marker[] = [];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map!: google.maps.Map;
  cursorType: 'visited' | 'wish' | null = null;
  markerIcons = {
    'wish': '../../../../../../../assets/main-module/profile/wish-cursor.svg',
    'visited': '../../../../../../../assets/main-module/profile/visited-cursor.svg'
  }

  loader = new Loader({
    apiKey: 'AIzaSyD5Xpnp8u4QkUyNA6yRkinNCcv6n0EeKfQ'
  });

  constructor() { }

  ngOnInit(): void {
    this.loader.load().then(() => {

      this.mapInit({ lat: 10, lng: 20 });

      this.map.addListener("click", (mapsMouseEvent: any) => {
        if (this.cursorType) {
          const createdMarker = this.createMarker(this.cursorType, mapsMouseEvent.latLng);
          markers.push(createdMarker);
          this.disableAddMarkers();
        }
      });
    });
  }

  mapInit(latLng: LatLng): void {
    const mapDiv = document.getElementById("google-map");

    if (mapDiv) {
      this.map = new google.maps.Map(mapDiv, {
        mapId: 'f23f75a0977714e8',
        center: latLng,
        zoom: 3,
        draggableCursor: 'grab',
        draggingCursor: 'grabbing',
        disableDefaultUI: true,
        fullscreenControl: true,
        keyboardShortcuts: false
      });

      for (let marker of initMarkares) {
        const createdMarker = this.createMarker(marker.type, marker.possition);
        markers.push(createdMarker);
      }
    }
  }

  createMarker(markerType: 'visited' | 'wish', latLng: LatLng) {
    return new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: {
        url: this.markerIcons[markerType],
        size: new google.maps.Size(50, 50),
        scaledSize: new google.maps.Size(50, 50),
        anchor: new google.maps.Point(10, 20)
      },
      cursor: 'default',
      animation: google.maps.Animation.DROP,
    });
  }

  enableAddVisitedMarker(btn: HTMLElement) {
    this.cursorType = 'visited';
    this.enableAddMarker(this.cursorType);
    btn.classList.add('focused');
  }

  enableAddWishMarker(btn: HTMLElement) {
    this.cursorType = 'wish';
    this.enableAddMarker(this.cursorType);
    btn.classList.add('focused');
  }

  enableAddMarker(markerType: 'visited' | 'wish') {
    this.cursorType = markerType;
    this.map.setOptions({
      draggableCursor: `url(${this.markerIcons[markerType]}), default`
    });

    const focusedBtn = document.querySelector('.focused');
    if (focusedBtn) focusedBtn.classList.remove('focused');
  }

  disableAddMarkers() {
    this.cursorType = null;
    this.map.setOptions({
      draggableCursor: "default"
    });

    const focusedBtn = document.querySelector('.focused');
    if (focusedBtn) focusedBtn.classList.remove('focused');
  }

  deleteAllMarkers() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
}


type LatLng = {
  lat: number;
  lng: number;
};

type Marker = {
  type: 'visited' | 'wish';
  possition: LatLng;
};
