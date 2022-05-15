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

export {TripInfo}