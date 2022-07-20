type TripInfo = {
  country: string;
  city: string;
  totalPrice: number;
  description: string;
  transportation: string;
  transportationPrice: number;
  owner: {
    username: string;
    firstName: string;
    lastName: string;
  };
  tripId: string;
  rate: number;
  img: string;
};

type TripDay = {
  place: string;
  price: number;
  description: string;
}

type TripData = {
  creatorInfo: {
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  images: string[];
  country: string;
  city: string;
  description: string;
  totalPrice: number;
  rating: number;
  locations: {
    coordinates: string;
    description: string;
    transportation: string;
    price: number;
  }[];
};

export {TripInfo, TripDay, TripData}