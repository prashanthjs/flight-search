import { gql } from '@apollo/client';

export const SEARCH_FLIGHTS_QUERY = gql`
  query searchFlights($search: FlightSearchInput!) {
    searchFlights(search: $search) {
      id
      flightNumber
      airline
      departureCity
      arrivalCity
      departureTime
      arrivalTime
      price
      distance
      co2Emission
      totalCo2Emission
    }
  }
`;
