import { Cache, CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { FlightsResolver } from './flights.resolver';
import { FlightsService } from './flights.service';
import { FlightModel } from './models/flight.model';

describe('FlightsResolver', () => {
  let app: TestingModule;
  let resolver: FlightsResolver;
  let service: FlightsService;
  let cacheManager: Cache;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [CacheModule.register({})],
      controllers: [],
      providers: [
        FlightsResolver,
        FlightsService,
        {
          provide: 'DB',
          useValue: {},
        },
      ],
    }).compile();

    resolver = app.get(FlightsResolver);
    service = app.get(FlightsService);
    cacheManager = app.get(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should search flights - no cache', async () => {
    const search = {
      departureCity: 'departureCity',
      arrivalCity: 'arrivalCity',
    };
    const flights = [{ id: 1 }];
    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(null);
    jest.spyOn(service, 'searchFlights').mockResolvedValueOnce(flights as any);
    const result = await resolver.searchFlights(search);
    expect(result).toMatchObject(flights);
    expect(cacheManager.get).toHaveBeenCalledWith('flights-search-departurecity-arrivalcity-all');
    expect(service.searchFlights).toHaveBeenCalledWith(search);
  });

  it('should search flights - from cache', async () => {
    const search = {};
    const flights = [{ id: 1 }];
    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(flights as any);
    jest.spyOn(service, 'searchFlights').mockResolvedValueOnce(flights as any);
    const result = await resolver.searchFlights(search);
    expect(result).toMatchObject(flights);
    expect(cacheManager.get).toHaveBeenCalledWith('flights-search-all-all-all');
    expect(service.searchFlights).not.toHaveBeenCalled();
  });

  it('should calculate the total co2 emission', async () => {
    const flight = {
      id: 1,
      co2Emission: 60,
      distance: 100,
    };
    const result = await resolver.totalCo2Emission(flight as FlightModel);
    expect(result).toBe(60 * 100);
  });
});
