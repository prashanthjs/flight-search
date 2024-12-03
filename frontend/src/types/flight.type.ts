export type FlightType = {
  id: number;
  flightNumber: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  co2Emission: number;
  price: number;
  distance: number;
  totalCo2Emission: number;
};

export type FlightSearchInputType = {
  departureCity?: string;
  arrivalCity?: string;
  departureDate?: string;
};
