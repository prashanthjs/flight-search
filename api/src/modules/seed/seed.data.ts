import { FlightCreateDto } from '../flights';

const flightsMockData: FlightCreateDto[] = [];

const cities = ['London', 'New York', 'Paris', 'Tokyo', 'Sydney', 'Dubai', 'Los Angeles', 'Toronto', 'Berlin', 'Singapore'];
const airlines = [
  'British Airways',
  'American Airlines',
  'Air France',
  'Japan Airlines',
  'Qantas',
  'Emirates',
  'Delta',
  'Air Canada',
  'Lufthansa',
  'Singapore Airlines',
];
const baseDepartureDate = new Date('2025-01-01T00:00:00.000Z');

for (let i = 0; i < 50; i++) {
  const departureCity = cities[i % cities.length];
  const arrivalCity = cities[(i + 1) % cities.length];
  const departureDate = new Date(baseDepartureDate);
  departureDate.setDate(baseDepartureDate.getDate() + Math.floor(i / cities.length));
  const arrivalDate = new Date(departureDate);
  arrivalDate.setHours(departureDate.getHours() + 8); // Assuming an 8-hour flight for simplicity

  flightsMockData.push({
    flightNumber: `AA${100 + i}`,
    airline: airlines[i % airlines.length],
    departureCity,
    arrivalCity,
    departureTime: departureDate.toISOString(),
    arrivalTime: arrivalDate.toISOString(),
    co2Emission: Math.floor(Math.random() * 100) + 50,
    price: Math.random() * 500 + 100,
    distance: Math.random() * 1000 + 500,
  });
}

export { flightsMockData };
