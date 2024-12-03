import { FlightType } from '@/types/flight.type';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Image } from '@nextui-org/image';
import dayjs from 'dayjs';

type FlightCardProps = {
  flight: FlightType;
};

export function FlightCard({ flight }: FlightCardProps) {
  const image = `https://ui-avatars.com/api/?name=${flight.airline}`;

  return (
    <Card className="min-w-[600px]">
      <CardHeader className="flex gap-3">
        <Image alt={flight.airline} height={40} radius="sm" src={image} width={40} />
        <div className="flex flex-col">
          <p className="text-md">{flight.flightNumber}</p>
          <p className="text-small text-default-500">{flight.airline}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-row gap-2 justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-default-500">Departure</p>
            <p className="text-sm">{flight.departureCity}</p>
            <p className="text-sm">{dayjs(flight.departureTime).format('LLLL')}</p>
          </div>
          <Divider orientation="vertical" className="h-16" />
          {/* right side */}
          <div className="flex flex-col gap-2 text-right">
            <p className="text-sm text-default-500">Arrival</p>
            <p className="text-sm">{flight.arrivalCity}</p>
            <p className="text-sm">{dayjs(flight.arrivalTime).format('LLLL')}</p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <div className="flex flex-col gap-2 ">
            <p className="text-sm text-default-500">Price</p>
            <p className="text-sm">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(flight.price)}</p>
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="flex flex-col gap-2">
            <p className="text-sm text-default-500">Distance</p>
            <p className="text-sm">{new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(flight.distance)} Miles</p>
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="flex flex-col gap-2">
            <p className="text-sm text-default-500">CO2 Emission(per mile)</p>
            <p className="text-sm">{flight.co2Emission}</p>
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="flex flex-col gap-2">
            <p className="text-sm text-default-500">Total CO2 Emission</p>
            <p className="text-sm">{new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(flight.totalCo2Emission)}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
