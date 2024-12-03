import { FlightCard } from '@/components/flight-card';
import { FlightEmptyMessage } from '@/components/flight-empty-message.tsx';
import { FlightErrorMessage } from '@/components/flight-error-message.tsx';
import { FlightSearchInput } from '@/components/flight-search-input.tsx';
import { MainLayout } from '@/components/main-layout';
import { StatusMessage } from '@/components/status-message';
import { SEARCH_FLIGHTS_QUERY } from '@/gqls/query.gql.ts';
import { FlightSearchInputType, FlightType } from '@/types/flight.type.ts';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function IndexPage() {
  const [searchInput, setSearchInput] = useState<FlightSearchInputType>({});

  const { data, loading, error } = useQuery(SEARCH_FLIGHTS_QUERY, {
    variables: {
      search: searchInput,
    },
  });

  function handleSearchInput(input: FlightSearchInputType) {
    setSearchInput({
      departureCity: input.departureCity || undefined,
      arrivalCity: input.arrivalCity || undefined,
      departureDate: input.departureDate ? dayjs(input.departureDate).format('YYYY-MM-DD') : undefined,
    });
  }

  return (
    <MainLayout>
      <StatusMessage isLoading={loading} />
      <section className="flex flex-col  gap-8 w-full p-8">
        <FlightSearchInput onSubmit={handleSearchInput} isLoading={loading} />

        {data?.searchFlights?.length === 0 && !loading && <FlightEmptyMessage />}
        {error && <FlightErrorMessage message={error?.message} />}
        <div className="flex flex-col gap-8 md:flex-row flex-wrap flex-items-center justify-center">
          {data?.searchFlights?.map((flight: FlightType) => <FlightCard key={flight.id} flight={flight} />)}
        </div>
      </section>
    </MainLayout>
  );
}
