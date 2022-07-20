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
  success: boolean;
  results: {
    _id: string;
    firstName: string;
    lastName: string;
    ascii_name: string;
    native_name: string;
    images: string[];
    location: {
      latitude: number;
      longitude: number;
    };
    timeZone: string | null;
    country: {
      _id: string;
      ISONumeric: string;
      name: string;
      flag: string;
      capital: string;
      language: {
        code: string;
        name: string;
        _id: string;
      };
      currency: {
        code: string;
        name: string;
        symbol: string;
        _id: string;
      };
      region: string;
      emergencyNumbers: {
        police: string[];
        ambulance: string[];
        fire: string[];
        _id: string;
      };
      __v: number;
    };
    population: number;
    __v: number;
    isAdmin: boolean;
  };
};

type CityInfo = {
  name: string;
  cover: string;
  timeZone: string | null;
  images: string[];
  population: number;
  temperature: number;
  country: {
    name: string;
    emergencyNumbers: {
      police: string[];
      ambulance: string[];
      fire: string[];
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
  Hotel,
};
