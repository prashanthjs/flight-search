import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FlightsService } from './flights.service';
import { FlightSearchInputModel } from './models/flight-search-input.model';
import { FlightModel } from './models/flight.model';

@Resolver(() => FlightModel)
export class FlightsResolver {
  private readonly logger = new Logger(FlightsResolver.name);

  constructor(
    private flightsService: FlightsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Query(() => [FlightModel])
  async searchFlights(@Args('search', { nullable: true }) search: FlightSearchInputModel) {
    const cacheKey = `flights-search-${(search?.departureCity ?? 'all').toLowerCase()}-${(search?.arrivalCity ?? 'all').toLowerCase()}-${search?.departureDate ?? 'all'}`;
    const cachedFlights = await this.cacheManager.get(cacheKey);
    if (cachedFlights) {
      this.logger.log(`Cache hit for ${cacheKey}`);
      return cachedFlights;
    }
    this.logger.log(`Cache miss for ${cacheKey}`);
    const flights = await this.flightsService.searchFlights(search ?? {});
    await this.cacheManager.set(cacheKey, flights);
    return flights;
  }
  @ResolveField(() => Number)
  async totalCo2Emission(@Parent() flightModel: FlightModel) {
    const { co2Emission, distance } = flightModel;
    return distance * co2Emission;
  }
}
