import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MapService } from './map.service';
import { LatLng, Marker, MarkerType } from './marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  canAddMarker: boolean = false;
  canDelete: boolean = false;

  markers: { markerId: string; marker: google.maps.Marker }[] = [];
  markerType!: MarkerType;
  markerIcons = {
    wish: '../../../../../../../assets/main-module/profile/wish-cursor.svg',
    visited:
      '../../../../../../../assets/main-module/profile/visited-cursor.svg',
    delete: '../../../../../../../assets/main-module/profile/delete-cursor.svg',
  };

  map!: google.maps.Map;
  loader = new Loader({
    apiKey: 'AIzaSyD5Xpnp8u4QkUyNA6yRkinNCcv6n0EeKfQ',
  });

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.loader.load().then(() => {
      this.mapInit();
    });
  }

  /**
   * function initiate the map and its event listener
   * called in ngOnInit ==> map loader
   */
  mapInit(): void {
    const mapDiv = document.getElementById('google-map');
    if (mapDiv) {
      this.map = new google.maps.Map(mapDiv, {
        mapId: 'f23f75a0977714e8',
        center: { lat: 10, lng: 20 },
        zoom: 3,
        draggableCursor: 'grab',
        draggingCursor: 'grabbing',
        disableDefaultUI: true,
        fullscreenControl: true,
        keyboardShortcuts: false,
      });

      const initMarkares = this.mapService.getAllMarkers(); // get request return all markers
      for (let marker of initMarkares) {
        const createdMarker = this.createMarker(marker);
      }

      this.map.addListener('click', (mapsMouseEvent: any) => {
        if (this.canAddMarker) {
          let markerData = {
            type: this.markerType,
            possition: mapsMouseEvent.latLng,
          };

          const markerId = this.mapService.addMarker(markerData); // TODO: subscribe to the post request here
          this.createMarker({ id: markerId, ...markerData }); // TODO: but me inside the subscribe
          this.disableAddMarkers(); // to prevent adding more than one marker at a time
        }
      });
    }
  }

  /**
   * function creates marker and it's event listener
   * called in initMap to create initial markers and add markers on click
   * @param marker
   */
  createMarker(marker: Marker): void {
    const newMarker = new google.maps.Marker({
      position: marker.possition,
      map: this.map,
      icon: {
        url: this.markerIcons[marker.type],
        size: new google.maps.Size(50, 50),
        scaledSize: new google.maps.Size(50, 50),
        anchor: new google.maps.Point(10, 20),
      },
      cursor: 'default',
      animation: google.maps.Animation.DROP,
    });

    this.markers.push({ markerId: marker.id, marker: newMarker });

    newMarker.addListener('mouseover', () => {
      if (this.canDelete) {
        newMarker.setCursor(`url(${this.markerIcons['delete']}), default`);
      }
    });

    newMarker.addListener('click', () => {
      if (this.canDelete) {
        newMarker.setVisible(false);
        this.deleteMarker();
        this.disableDeleteMarkers();
      }
    });
  }

  /**
   * function to change the marker type to visited and make the btn focused
   * called in the template when btn clicked
   * @param btn
   */
  enableAddVisitedMarker(btn: HTMLElement): void {
    this.markerType = 'visited';
    this.enableAddMarker(this.markerType);
    btn.classList.add('focused');
  }

  /**
   * function to change the marker type to wish and make the btn focused
   * called in the template when btn clicked
   * @param btn
   */
  enableAddWishMarker(btn: HTMLElement): void {
    this.markerType = 'wish';
    this.enableAddMarker(this.markerType);
    btn.classList.add('focused');
  }

  /**
   * function enable creating new markers and change the cursor to a marker cursor
   * called in enableAddVisitedMarker, enableAddWishMarker
   * @param markerType
   */
  enableAddMarker(markerType: MarkerType): void {
    this.canAddMarker = true;

    this.markerType = markerType;
    this.map.setOptions({
      draggableCursor: `url(${this.markerIcons[markerType]}), default`,
    });

    // to unfocus any focused btn if found ==> so there is only one focused btn at a time
    const focusedBtn = document.querySelector('.focused');
    if (focusedBtn) focusedBtn.classList.remove('focused');
  }

  /**
   * function disable creating new marker, reset the default cursor and unfocus the focused btn
   * called in initMap event listener after creating a marker
   */
  disableAddMarkers(): void {
    this.canAddMarker = false;
    this.map.setOptions({
      draggableCursor: 'default',
    });

    const focusedBtn = document.querySelector('.focused');
    if (focusedBtn) focusedBtn.classList.remove('focused');
  }

  /**
   * function enable deleting markers, change the cursor to a delete cursor
   * called in the template on btn click
   * @param btn
   */
  enableDeleteMarker(btn: HTMLElement): void {
    this.canDelete = true;
    this.map.setOptions({
      draggableCursor: `url(${this.markerIcons['delete']}), default`,
    });

    const focusedBtn = document.querySelector('.focused');
    if (focusedBtn) focusedBtn.classList.remove('focused');
    btn.classList.add('focused');
  }

  /**
   * function disable deleting markers, reset the default cursor, and unfocus the focused btn
   * called in createMarker in click marker event listener
   */
  disableDeleteMarkers(): void {
    this.canDelete = false;
    this.map.setOptions({
      draggableCursor: 'default',
    });

    const focusedBtn = document.querySelector('.focused');
    if (focusedBtn) focusedBtn.classList.remove('focused');
  }

  /**
   * function delete marker from the map and the database
   * called in createMarker in click marker event listener
   */
  deleteMarker() {
    for (let index = 0; index < this.markers.length; index++) {
      if (this.markers[index].marker.getVisible() === false) {
        this.mapService.deleteMarker(this.markers[index].markerId); // delete from the database
        this.markers[index].marker.setMap(null); // delete from the map
        this.markers.splice(index, 1); // delet from the array
        break;
      }
    }
  }
}
