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
  price: number;
};

type GetCityInfoResponse = {
  success: true;
  results: {
    _id: string;
    firstName: string;
    lastName: string;
    images: string[];
    location: {
      latitude: number;
      longitude: number;
    };
    timeZone: Date;
    country: {
      language: {
        code: string;
        name: string;
      };
      currency: {
        code: string;
        name: string;
        symbol: string;
      };
      _id: string;
      name: string;
      flag: string;
      capital: string;
      region: string;
      emergencyNumbers: {
        police: number[];
        ambulance: number[];
        fire: number[];
        _id: string;
      };
      __v: 0;
    };
    __v: 0;
  };
};

type CityInfo = {
  name: string;
  cover: string;
  timeZone: Date;
  images: string[];
  population: number;
  temperature: number;
  country: {
    name: string;
    emergencyNumbers: {
      police: number[];
      ambulance: number[];
      fire: number[];
    };
  };
};

type GetHotelsResponse = {
  success: true;
  results: {
    data: {
      url: string;
      hotel_name: string;
      checkin: {
        until: string;
        from: string;
      };
      checkout: {
        until: string;
        from: string;
      };
      hotel_id: number;
      review_score: number;
      review_score_word: string;
      review_nr: number;
      address: string;
      min_total_price: number;
      main_photo_url: string;
      max_photo_url: string;
      max_1440_photo_url: string;
    }[];
  };
};

type Hotel = {
  name: string;
  bookingLink: string;
  reviewScore: number;
  reviewScoreWord: string;
  numberOfReviews: number;
  address: string;
  price: number;
  image: string;
};

export {
  GetActivitiesResponse,
  Activity,
  ActivitiesData,
  CityInfo,
  GetCityInfoResponse,
  GetHotelsResponse,
  Hotel
};
