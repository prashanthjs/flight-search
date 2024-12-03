import { Card, CardBody } from '@nextui-org/card';

export function FlightEmptyMessage() {
  return (
    <div className="flex flex-col gap-8 md:flex-row flex-wrap flex-items-center justify-center">
      <Card className="max-w-[600px]">
        <CardBody className="flex flex-col p-8 justify-center items-center">
          <div className="flex flex-row gap-2 justify-between items-center text-center">No flights found for the given search criteria</div>
        </CardBody>
      </Card>
    </div>
  );
}
