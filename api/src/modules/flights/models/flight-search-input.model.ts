import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsOptional, IsString, Matches } from 'class-validator';

@InputType('FlightSearchInput')
export class FlightSearchInputModel {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  departureCity?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  arrivalCity?: string;

  @Field({ nullable: true })
  @IsDateString({ strict: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  departureDate?: string;
}
