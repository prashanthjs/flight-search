import { apolloClient } from '@/lib/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from '@nextui-org/system';
import { I18nProvider } from '@react-aria/i18n';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <I18nProvider locale="en-GB">
      <NextUIProvider navigate={navigate}>
        <NextThemesProvider attribute="class" defaultTheme="dark" themes={['light', 'dark', 'modern']}>
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </I18nProvider>
  );
}
