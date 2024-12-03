import { IsDateString, IsNumber, Length } from 'class-validator';

export class FlightCreateDto {
  @Length(1, 100)
  flightNumber: string;

  @Length(1, 100)
  airline: string;

  @Length(1, 100)
  departureCity: string;

  @Length(1, 100)
  arrivalCity: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;

  @IsNumber()
  co2Emission: number;

  @IsNumber()
  price: number;

  @IsNumber()
  distance: number;
}
