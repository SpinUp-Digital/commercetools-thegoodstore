import React, { useRef, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Log } from 'helpers/errorLogger';
import { sdk } from 'sdk';
import { createClient, FrontasticRenderer, Notifier } from 'frontastic';
import { tastics } from 'frontastic/tastics';
import styles from '../slug.module.css';

type PreviewProps = {
  // This needs an overhaul. Can be too many things in my opinion (*Marcel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // data: RedirectResponse | PageDataResponse | ResponseError | { ok: string; message: string } | string;
};

export default function Preview({ data }: PreviewProps) {
  const [currentHighlight, setCurrentHighlight] = useState<string>();
  const notifier = useRef<Notifier>(null) as React.MutableRefObject<Notifier>;

  const handleRefresh = () => {
    // Do a proper refresh and no full reload
    window.location = window.location;
  };
  const handleEndHighlight = () => setCurrentHighlight(undefined);

  // in case of an error from API hub, we get a ResponseError as JSON back here
  if (data?.ok === false) {
    Log.error(data);
  }

  useEffect(() => {
    const handleHighlight = ({ item }: { item: string }) => {
      if (currentHighlight !== item) {
        setCurrentHighlight(item);
      }
    };
    if (data?.previewId && !notifier.current) {
      notifier.current = new Notifier(
        { previewId: data.previewId, customer: data?.previewContext?.customerName ?? 'demo' },
        {
          Refresh: handleRefresh,
          Highlight: handleHighlight,
          EndHighlight: handleEndHighlight,
        },
      );
      notifier.current.connect();
    }
  }, [currentHighlight, data?.previewId, data?.previewContext?.customerName]);

  useEffect(() => {
    //Gtag mock function
    window.gtag = function () {};
  }, []);

  if (!data) {
    return null;
  }

  return (
    <FrontasticRenderer
      data={data}
      tastics={tastics}
      wrapperClassName={styles.gridWrapper}
      currentHighlight={currentHighlight as string}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  sdk.configureForNext(locale as string);

  const frontastic = createClient();

  const [data, categories] = await Promise.all([
    frontastic.getPreview(params?.previewId?.toString() ?? ''),
    frontastic.getCategories(),
  ]);

  return {
    props: {
      data: { ...data, categories },
      ...(await serverSideTranslations(locale as string, [
        'common',
        'cart',
        'product',
        'checkout',
        'account',
        'customer-support',
        'error',
        'success',
        'wishlist',
        'newsletter',
      ])),
    },
  };
};
