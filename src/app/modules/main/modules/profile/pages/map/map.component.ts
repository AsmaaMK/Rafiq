import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map!: google.maps.Map;
  constructor() { }
  
  ngOnInit(): void {
    const mapDiv = document.getElementById("google-map");
    let loader = new Loader({
      apiKey: 'AIzaSyD5Xpnp8u4QkUyNA6yRkinNCcv6n0EeKfQ'
    });

    loader.load().then(() => {
      
      if (mapDiv) {
        console.log('loaded google maps');
        this.map = new google.maps.Map(mapDiv, {
          center: { lat: 30.852873830183167, lng: 32.23188898842041 },
          zoom: 3,
          mapId: 'f23f75a0977714e8'
        });
      }

      const marker = new google.maps.Marker({
        position: { lat: 30.852873830183167, lng: 32.23188898842041 },
        map: this.map,
      });
    });
  }
}