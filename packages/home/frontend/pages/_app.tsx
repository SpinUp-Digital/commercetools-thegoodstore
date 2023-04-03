import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import Toaster from 'components/commercetools-ui/atoms/toaster';
import 'tailwindcss/tailwind.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/app.css';
import { sdk } from 'sdk';
import { FrontasticProvider } from 'frontastic';

function FrontasticStarter({ Component, pageProps }: AppProps) {
  const router = useRouter();

  sdk.configureForNext(router.locale as string);

  return (
    <FrontasticProvider>
      <Component {...pageProps} />
      <Toaster />
    </FrontasticProvider>
  );
}

export default appWithTranslation(FrontasticStarter);
