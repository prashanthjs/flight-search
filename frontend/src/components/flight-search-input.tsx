import { FlightSearchInputType } from '@/types/flight.type';
import { parseDate } from '@internationalized/date';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { DatePicker } from '@nextui-org/date-picker';
import { Input } from '@nextui-org/input';
import { useForm } from 'react-hook-form';

type Inputs = {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
};

type FlightSearchInputProps = {
  onSubmit: (data: FlightSearchInputType) => void;
  isLoading?: boolean;
};

export function FlightSearchInput({ onSubmit, isLoading }: FlightSearchInputProps) {
  const { register, handleSubmit, watch, setValue, reset } = useForm<Inputs>();

  function handleReset() {
    setValue('departureCity', '');
    setValue('arrivalCity', '');
    setValue('departureDate', '');
    reset();
    handleSubmit(onSubmit)();
  }

  const departureDate = watch('departureDate');

  return (
    <div className="flex flex-row gap-8 flex-wrap flex-items-center justify-center">
      <Card className="w-[1200px] p-12 align-items-center flex-items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-wrap md:flex-row gap-4 align-items-center">
            <div className={'w-full md:max-w-[300px]'}>
              <Input type="text" label="Departure City" placeholder="London" {...register('departureCity')} />
            </div>
            <div className={'w-full md:max-w-[300px]'}>
              <Input type="text" label="Arrival City" placeholder="New York" {...register('arrivalCity')} />
            </div>

            <div className={'w-full md:max-w-[300px]'}>
              <DatePicker
                label={'Departure date'}
                granularity="day"
                className="max-w-sm"
                value={departureDate ? parseDate(departureDate) : undefined}
                onChange={(value) => {
                  setValue('departureDate', value?.toString());
                }}
              />
            </div>
            <div className={'w-full md:max-w-[100px] flex gap-4 items-center'}>
              <Button type="submit" color="primary" isLoading={isLoading}>
                Search
              </Button>

              <Button color="danger" isLoading={isLoading} onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
