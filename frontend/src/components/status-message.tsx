import { Button } from '@nextui-org/button';

type StatusMessageProps = {
  isLoading?: boolean;
  isRefreshing?: boolean;
};

export function StatusMessage({ isLoading, isRefreshing }: StatusMessageProps) {
  return (
    <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 -translate-y-1/2 transform">
      {isLoading && <Button isLoading={true}>Loading...</Button>}
      {isRefreshing && !isLoading && <Button isLoading={true}>Refreshing...</Button>}
    </div>
  );
}
