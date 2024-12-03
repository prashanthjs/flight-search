import { SeedModule, SeedService } from '@/modules/seed';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import * as process from 'node:process';

export async function seedBootstrap() {
  const app = await NestFactory.create(SeedModule);
  const seedService = app.get(SeedService);
  await seedService.run();
  await app.close();
  console.log('Seeding done');
  process.exit(0);
}

seedBootstrap();
