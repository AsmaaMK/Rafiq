type GetActivitiesResponse = {
  success: true;
  results: {
    data: ActivitiesData[];
  };
};

type ActivitiesData = {
  id: string;
  type: string;
  name: string;
  shortDescription: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  pictures: string[];
  bookingLink: string;
  price: {
    currencyCode: string;
    amount: number;
  };
};

type Activity = {
  name: string;
  shortDescription: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  picture: string;
  bookingLink: string;
};

export { GetActivitiesResponse, Activity, ActivitiesData };
