import { Test, TestingModule } from '@nestjs/testing';
import { FlightsService } from './flights.service';

describe('FlightsService', () => {
  let app: TestingModule;
  let service: FlightsService;
  let insertValueSpy: jest.SpyInstance;
  let querySpy: jest.SpyInstance;

  beforeEach(async () => {
    insertValueSpy = jest.fn();
    querySpy = jest.fn();
    app = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        FlightsService,
        {
          provide: 'DB',
          useValue: {
            insert: () => ({ values: insertValueSpy }),
            query: {
              flightsSchema: {
                findMany: querySpy,
              },
            },
          },
        },
      ],
    }).compile();

    service = app.get(FlightsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should  create  flight', async () => {
    const flight = {
      departureCity: 'departureCity',
      arrivalCity: 'arrivalCity',
      departureTime: new Date().toISOString(),
      arrivalTime: new Date().toISOString(),
      flightNumber: 'AA101',
      airline: 'British Airways',
      co2Emission: 60,
      price: 100.5,
      distance: 100,
    };
    insertValueSpy.mockReturnValueOnce({ ...flight, id: 1 });
    const result = await service.createFlight(flight);
    expect(result).toMatchObject({ id: 1 });
  });

  it('should search flights', async () => {
    const search = {
      departureCity: 'departureCity',
      arrivalCity: 'arrivalCity',
      departureDate: new Date().toISOString(),
    };
    querySpy.mockReturnValueOnce([{ ...search, id: 1 }]);
    const result = await service.searchFlights(search);
    expect(result).toMatchObject([{ ...search, id: 1 }]);
  });
});
