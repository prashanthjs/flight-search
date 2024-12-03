import { AppModule } from '@/app.module';
import { FlightsModule } from '@/modules/flights';
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';

@Module({
  imports: [AppModule, FlightsModule],
  controllers: [],
  providers: [SeedService],
})
export class SeedModule {}
