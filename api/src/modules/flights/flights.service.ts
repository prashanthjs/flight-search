import { flightsSchema } from '@/db/db.schema';
import { DBType } from '@/db/db.type';
import { Inject, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import * as dayjs from 'dayjs';
import { and, gte, lte, sql } from 'drizzle-orm';
import { FlightCreateDto } from './dtos/flight-create.dto';
import { FlightSearchInputModel } from './models/flight-search-input.model';

@Injectable()
export class FlightsService {
  constructor(@Inject('DB') private readonly db: DBType) {}

  async searchFlights(search?: FlightSearchInputModel) {
    const filters = [];
    if (search?.departureCity) {
      filters.push(sql`lower(${flightsSchema.departureCity})= lower(${search.departureCity})`);
    }
    if (search?.arrivalCity) {
      filters.push(sql`lower(${flightsSchema.arrivalCity})= lower(${search.arrivalCity})`);
    }

    if (search?.departureDate) {
      filters.push(gte(flightsSchema.departureTime, dayjs(search.departureDate).startOf('day').toDate()));
      filters.push(lte(flightsSchema.departureTime, dayjs(search.departureDate).endOf('day').toDate()));
    }

    const flights = await this.db.query.flightsSchema.findMany({
      where: filters.length > 0 ? and(...filters) : undefined,
    });

    return flights.map((flight) => {
      return {
        ...flight,
        departureTime: dayjs(flight.departureTime).toISOString(),
        arrivalTime: dayjs(flight.arrivalTime).toISOString(),
        createdAt: dayjs(flight.createdAt).toISOString(),
        updatedAt: dayjs(flight.updatedAt).toISOString(),
      };
    });
  }

  async createFlight(flight: FlightCreateDto) {
    return this.db.insert(flightsSchema).values({
      ...instanceToPlain(flight),
      arrivalTime: new Date(flight.arrivalTime),
      departureTime: new Date(flight.departureTime),
    });
  }
}
