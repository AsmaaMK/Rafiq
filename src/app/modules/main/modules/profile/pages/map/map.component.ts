import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MapService } from './map.service';
import { Marker, MarkerData, MarkerType } from './marker';

enum markerIcons {
  wish = 'assets/main-module/profile/wish-cursor.svg',
  visited = 'assets/main-module/profile/visited-cursor.svg',
  delete = 'assets/main-module/profile/delete-cursor.svg',
  default = 'https://maps.gstatic.com/mapfiles/openhand_8_8.cur',
}

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

  map!: google.maps.Map;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.initMapLoader();
  }

  initMapLoader(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyD5Xpnp8u4QkUyNA6yRkinNCcv6n0EeKfQ',
    });

    loader.load().then(() => {
      const mapDiv = document.getElementById('google-map');
      if (mapDiv) {
        this.map = this.mapInit(mapDiv);
        this.createInitialMarkers(); // send get request
        this.listenToMapClickEvent();
      }
    });
  }

  /**
   * Initiate the map, should be called in map loader
   */
  mapInit(mapDiv: HTMLElement): google.maps.Map {
    return new google.maps.Map(mapDiv, {
      mapId: 'f23f75a0977714e8',
      center: { lat: 10, lng: 20 },
      zoom: 3,
      disableDefaultUI: true,
      fullscreenControl: true,
      keyboardShortcuts: false,
    });
  }

  listenToMapClickEvent(): void {
    this.map.addListener('click', (mapsMouseEvent: any) => {
      if (this.canAddMarker) {
        let markerData = {
          type: this.markerType,
          possition: mapsMouseEvent.latLng,
        };

        this.createNewMarker(markerData); // send post request
        this.disableAddMarkers(); // to prevent adding more than one marker at a time
      }
    });
  }

  dropMarkerOnMap(marker: Marker): google.maps.Marker {
    return new google.maps.Marker({
      position: marker.possition,
      map: this.map,
      icon: {
        url: markerIcons[marker.type],
        size: new google.maps.Size(50, 50),
        scaledSize: new google.maps.Size(50, 50),
        anchor: new google.maps.Point(10, 20),
      },
      cursor: markerIcons.default,
      animation: google.maps.Animation.DROP,
    });
  }

  /**
   * function creates marker and it's event listener
   */
  createMarker(marker: Marker): google.maps.Marker {
    const newMarker = this.dropMarkerOnMap(marker);
    this.markers.push({ markerId: marker.id, marker: newMarker });
    this.setMarkerEventListerners(newMarker);
    return newMarker;
  }

  setMarkerEventListerners(marker: google.maps.Marker) {
    marker.addListener('mouseover', () => {
      if (this.canDelete) {
        this.changeMarkerCursor(marker, markerIcons.delete);
      }
    });

    marker.addListener('click', () => {
      if (this.canDelete) {
        marker.setVisible(false);
        this.deleteMarker(); // send delete request
        this.disableDeleteMarkers(marker);
      }
    });
  }

  enableAddVisitedMarker(btn: HTMLElement): void {
    this.markerType = 'visited';
    this.enableAddMarker(this.markerType);
    this.focusButton(btn);
  }

  enableAddWishMarker(btn: HTMLElement): void {
    this.markerType = 'wish';
    this.enableAddMarker(this.markerType);
    this.focusButton(btn);
  }

  enableAddMarker(markerType: MarkerType): void {
    this.canAddMarker = true;
    this.markerType = markerType;
    this.changeMapCursor(markerIcons[markerType]);
    this.unfocusFocusedButton();
  }

  enableDeleteMarker(btn: HTMLElement): void {
    this.canDelete = true;
    this.changeMapCursor(markerIcons.delete);
    this.unfocusFocusedButton();
    this.focusButton(btn);
  }

  disableAddMarkers(): void {
    this.canAddMarker = false;
    this.changeMapCursor(markerIcons.default);
    this.unfocusFocusedButton();
  }

  disableDeleteMarkers(marker: google.maps.Marker): void {
    this.canDelete = false;
    this.changeMapCursor(markerIcons.default);
    this.changeMarkerCursor(marker, markerIcons.default);
    this.unfocusFocusedButton();
  }

  createInitialMarkers(): void {
    const initMarkares = this.mapService.getAllMarkers(); // TODO: get request return all markers
    for (let marker of initMarkares) {
      const createdMarker = this.createMarker(marker);
    }
  }

  createNewMarker(markerData: MarkerData): void {
    const markerId = this.mapService.addMarker(markerData); // TODO: subscribe to the post request here
    this.createMarker({ id: markerId, ...markerData }); // TODO: but me inside the subscribe
  }

  /**
   * function send delete request to the server
   *   - if success delete the marker from the map
   *   - if fail make the marker visible and display error message
   */
  deleteMarker(): void {
    for (let index = 0; index < this.markers.length; index++) {
      if (this.markers[index].marker.getVisible() === false) {
        // this.mapService.deleteMarker(this.markers[index].markerId).subscribe(
        //   () => {
        //     this.markers[index].marker.setMap(null); // delete from the map
        //     this.markers.splice(index, 1); // delet from the array
        //   },
        //   (err) => {
        //     this.markers[index].marker.setVisible(true); // make it visible again
        //     console.log(err); // TODO: display the error message to the user
        //   }
        // );

        if (this.mapService.deleteMarker(this.markers[index].markerId)) {
          this.markers[index].marker.setMap(null); // delete from the map
          this.markers.splice(index, 1); // delete from the array
        } else {
          this.markers[index].marker.setVisible(true);
          console.log("can't delete the marker");
        }
        break;
      }
    }
  }

  changeMapCursor(cursorIconURL: markerIcons): void {
    this.map.setOptions({
      draggableCursor: `url(${cursorIconURL}), default`,
    });
  }

  changeMarkerCursor(
    marker: google.maps.Marker,
    cursorIconURL: markerIcons
  ): void {
    marker.setCursor(`url(${cursorIconURL}), default`);
  }

  /**
   * add 'focused' class to an HTMLElement
   */
  focusButton(btn: HTMLElement): void {
    btn.classList.add('focused');
  }

  /**
   * remove 'focused' class from btn if found
   */
  unfocusFocusedButton(): void {
    const focusedBtn = document.querySelector('.focused');
    if (focusedBtn) focusedBtn.classList.remove('focused');
  }
}
