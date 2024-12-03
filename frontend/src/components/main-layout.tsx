import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Footer } from './footer.tsx';
import { Header } from './header.tsx';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn('relative h-full w-full antialiased')}>
      <main className="relative flex min-h-screen w-screen flex-col">
        <div className="flex min-h-screen w-screen flex-row">
          <div className="flex flex-auto flex-col">
            <Header />
            <main className="flex flex-grow w-screen">{children}</main>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
