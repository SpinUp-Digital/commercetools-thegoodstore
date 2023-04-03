import React from 'react';
import { GetStaticProps, Redirect } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GASnippet from 'components/headless/GASnippet';
import { Log } from 'helpers/errorLogger';
import { sdk } from 'sdk';
import { createClient, FrontasticRenderer, ResponseError } from 'frontastic';
import { tastics } from 'frontastic/tastics';
import styles from './slug.module.css';

type Props = {
  // This needs an overhaul. Can be too many things in my opinion (*Marcel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // data: RedirectResponse | PageDataResponse | ResponseError | { ok: string; message: string } | string;
};

export default function Error404({ data }: Props) {
  if (!data) {
    return null;
  }

  return (
    <>
      <GASnippet />
      <FrontasticRenderer data={data} tastics={tastics} wrapperClassName={styles.gridWrapper} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  sdk.configureForNext(locale as string);

  const frontastic = createClient();
  const [data, categories] = await Promise.all([frontastic.getRouteData(['404']), frontastic.getCategories()]);

  if (data) {
    if (data instanceof ResponseError && data.getStatus() == 404) {
      return {
        notFound: true,
      };
    } else if (typeof data === 'object' && 'target' in data) {
      return {
        redirect: {
          destination: data.target,
          statusCode: data.statusCode,
        } as Redirect,
      };
    }
  }

  if (data instanceof Error) {
    // @TODO: Render nicer error page in debug mode, which shows the error to
    // the developer and also outlines how to debug this (take a look at
    // frontastic-CLI).
    Log.error(new Error('Error retrieving data: '), data);
    return {
      notFound: true,
    };
  }

  if (typeof data === 'string') {
    return {
      props: {
        data: { error: data },
        error: data,
      },
    };
  }

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
