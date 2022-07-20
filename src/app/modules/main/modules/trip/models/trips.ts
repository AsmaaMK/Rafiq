type TripData = {
  creatorInfo: {
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  images: string[];
  country: string;
  city: {
    type: [];
  };
  description: {
    type: String;
    default: '';
    maxlength: 1024;
  };
  totalPrice: {
    type: Number;
    default: 0;
    min: 0;
  };
  rating: {
    type: Number;
    default: 0;
    min: 0;
  };
  locations: {
    type: [];
  };
};

type location = {
  coordinates: {
    type: String;
    default: '';
    maxlength: 1024;
  };
  description: {
    type: String;
    default: '';
    maxlength: 1024;
  };
  transportation: {
    type: String;
    default: '';
    maxlength: 1024;
  };
  price: {
    type: Number;
    default: 0;
    min: 0;
  };
};
