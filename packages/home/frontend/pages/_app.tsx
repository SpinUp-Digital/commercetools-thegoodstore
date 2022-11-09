import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Toaster from 'components/commercetools-ui/atoms/toaster';
import { FrontasticProvider } from 'frontastic';
import 'tailwindcss/tailwind.css';
import '../styles/app.css';
import { SDK } from 'sdk';
import { useRouter } from 'next/router';

function FrontasticStarter({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  SDK.configure(locale);

  return (
    <FrontasticProvider>
      <Component {...pageProps} />
      <Toaster />
    </FrontasticProvider>
  );
}

export default appWithTranslation(FrontasticStarter);
