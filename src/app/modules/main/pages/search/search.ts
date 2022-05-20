type CitySearchResponse = {
  success: true;
  results: {
    suggestions: {
      _id: number;
      matchedImage: string;
      firstName: string;
      lastName: string;
      ascii_name: string;
      native_name: string;
      images: string[];
      location: {
        latitude: number;
        longitude: number;
      };
      timeZone: null;
      country: {
        _id: 'US';
        ISONumeric: '840';
        name: 'United States of America';
        flag: 'https://restcountries.eu/data/usa.svg';
        capital: 'Washington, D.C.';
        language: {
          code: 'en';
          name: 'English';
          _id: '62738d714a1a3c00ebbba91b';
        };
        currency: {
          code: 'USD';
          name: 'United States dollar';
          symbol: '$';
          _id: '62738d714a1a3c00ebbba91c';
        };
        region: 'NA';
        emergencyNumbers: {
          police: ['911'];
          ambulance: ['911'];
          fire: ['911'];
          _id: '62738a3c34aaf8525f03dd48';
        };
        __v: 0;
      };
      population: 18713220;
      __v: 0;
      isAdmin: false;
    }[];
  };
};

type UserSearchResponse = {
  success: true;
  results: {
    message: 'still under construction';
    suggestions: {
      _id: string;
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
      password: string;
      country: string;
      dateOfBirth: string;
      gender: string;
      resetToken: string;
      __v: number;
      confirmed: boolean;
      cover: string;
      avatar: string;
      numberOfFollowers: number;
      liveIn: string;
      socialMedia: [];
      posts: string[];
      newsFeed: string[];
      numberOfFollowings: number;
    }[];
  };
};

type CitySearchResult = {
  cityId: number;
  country: string;
  city: string;
  location: {
    lng: number;
    lat: number;
  };
  image: string;
};

type UserSearchResult = {
  name: string;
  username: string;
  avatar: string;
};

export {
  CitySearchResponse,
  UserSearchResult,
  CitySearchResult,
  UserSearchResponse,
};
