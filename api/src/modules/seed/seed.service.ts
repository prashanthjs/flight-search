import { Injectable } from '@nestjs/common';
import { flightsMockData } from '~/modules/seed/seed.data';
import { FlightsService } from '../flights';

@Injectable()
export class SeedService {
  constructor(private flightService: FlightsService) {}

  async run() {
    for (const flight of flightsMockData) {
      await this.flightService.createFlight(flight).catch(() => null);
    }
  }
}
