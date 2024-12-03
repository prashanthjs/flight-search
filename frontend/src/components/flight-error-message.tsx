import { Card, CardBody } from '@nextui-org/card';

type FlightErrorMessageProps = {
  message?: string;
};

export function FlightErrorMessage({ message }: FlightErrorMessageProps) {
  return (
    <div className="flex flex-col gap-8 md:flex-row flex-wrap flex-items-center justify-center">
      <Card className="max-w-[600px]">
        <CardBody className="flex flex-col p-8 justify-center items-center">
          <div className="flex flex-col gap-2 justify-between items-center text-center text-danger">
            <div className="text-danger">Oops! Something went wrong. please try again later</div>
            {message && <div className="text-danger">{message}</div>}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
