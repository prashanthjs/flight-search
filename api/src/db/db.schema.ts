import { index, numeric, pgTable, serial, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const flightsSchema = pgTable(
  'flights',
  {
    id: serial('id').primaryKey(),
    flightNumber: text('flight_number').notNull(),
    airline: text('airline').notNull(),
    departureCity: text('departure_city').notNull(),
    arrivalCity: text('destination_city').notNull(),
    departureTime: timestamp('departure_time', {
      withTimezone: true,
    }).notNull(),
    arrivalTime: timestamp('arrival_time', { withTimezone: true }).notNull(),
    co2Emission: numeric('co2_emissions', {
      precision: 10,
      scale: 2,
    }).notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    distance: numeric('distance', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  } as any,
  (table) => {
    return {
      flightNumberIdx: index('flight_number_idx').on(table.flightNumber),
      departureCityIdx: index('departure_city_idx').on(table.departureCity),
      arrivalCityIdx: index('arrival_city_idx').on(table.arrivalCity),
      departureTimeIdx: index('departure_time_idx').on(table.departureTime),
      arrivalTimeIdx: index('arrival_time_idx').on(table.arrivalTime),
      co2EmissionIdx: index('co2_emission_idx').on(table.co2Emission),
      uniqueWithFlightDetails: unique('pk_flights_details').on(table.flightNumber, table.departureCity, table.arrivalCity, table.departureTime),
    };
  },
);
