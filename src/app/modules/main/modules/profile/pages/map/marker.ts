type MarkerType = 'visited' | 'wish';

type LatLng = {
  lat: number;
  lng: number;
};

type Marker = {
  id: string;
  type: MarkerType;
  possition: LatLng;
};

type MarkerData = {
  type: MarkerType;
  possition: LatLng;
};

export { Marker, MarkerData, MarkerType, LatLng };