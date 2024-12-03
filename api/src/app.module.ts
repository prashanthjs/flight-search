import * as schema from '@/db/db.schema';
import { FlightsModule } from '@/modules/flights';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { redisStore } from 'cache-manager-redis-yet';
import * as process from 'node:process';
import { join } from 'path';
import configuration from './app.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.getOrThrow<string>('redisCache.host'),
            port: configService.getOrThrow<number>('redisCache.port'),
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: configService.getOrThrow<number>('redisCache.ttl'),
          max: configService.getOrThrow<number>('redisCache.max'),
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          autoSchemaFile: join(process.cwd(), './src/schema.gql'),
          sortSchema: true,
          playground: configService.getOrThrow<boolean>('isDev'),
          debug: configService.getOrThrow<boolean>('isDev'),
        };
      },
    }),
    DrizzlePGModule.registerAsync({
      tag: 'DB',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pg: {
            connection: 'client',
            config: {
              connectionString: configService.getOrThrow<string>('pg.databaseConnectionString'),
            },
          },
          config: { schema: { ...schema } },
        };
      },
    }),
    FlightsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
