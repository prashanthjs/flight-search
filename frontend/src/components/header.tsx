import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { MaxWidthWrapper } from './max-width-wrapper';

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 ">
      <MaxWidthWrapper className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button aria-label="Like" className="bg-background/0 text-default-400" isIconOnly size="sm">
            <PaperAirplaneIcon className="h-7" />
          </Button>
          <h1 className="text-md text-default-500">Flight Search</h1>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
