import { MaxWidthWrapper } from './max-width-wrapper';

export function Footer() {
  return (
    <header className="sticky bottom-0 z-50 bg-content1 text-sm text-default-400 inset-x-0">
      <MaxWidthWrapper className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-md text">{new Date().getFullYear()} © Flight Search</p>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
