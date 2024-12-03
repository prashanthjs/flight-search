import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Flight')
export class FlightModel {
  @Field(() => Int)
  id: number;

  @Field()
  flightNumber: string;

  @Field()
  airline: string;

  @Field()
  departureCity: string;

  @Field()
  arrivalCity: string;

  @Field()
  departureTime: string;

  @Field()
  arrivalTime: string;

  @Field()
  price: number;

  @Field()
  distance: number;

  @Field()
  co2Emission: number;

  @Field()
  totalCo2Emission: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
