import { Module } from '@nestjs/common';
import { FlightsResolver } from './flights.resolver';
import { FlightsService } from './flights.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FlightsResolver, FlightsService],
  exports: [FlightsService],
})
export class FlightsModule {}
