import * as schema from '@/db/db.schema';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { ApolloDriver } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { FlightsModule } from './flights.module';

describe('FlightsModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: 5,
          max: 10,
          isGlobal: true,
        }),
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: true,
          debug: false,
          playground: false,
        }),
        DrizzleBetterSQLiteModule.register({
          tag: 'DB',
          sqlite3: {
            filename: 'test.db',
          },
          config: { schema: { ...schema } },
        }),
        FlightsModule,
      ],
      controllers: [],
      providers: [],
    }).compile();
  });

  it('should return module"', () => {
    expect(app).toBeTruthy();
  });
});
