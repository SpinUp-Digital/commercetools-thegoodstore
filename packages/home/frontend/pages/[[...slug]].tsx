import React from 'react';
import { GetServerSideProps, Redirect } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import GASnippet from 'components/headless/GASnippet';
import { useFormat } from 'helpers/hooks/useFormat';
import { SDK } from 'sdk';
import { createClient, PageDataResponse, ResponseError } from 'frontastic';
import { FrontasticRenderer } from 'frontastic/lib/renderer';
import { tastics } from 'frontastic/tastics';
import { Props as ProductListTasticProps } from 'frontastic/tastics/products/product-list';
import { Log } from '../helpers/errorLogger';
import styles from './slug.module.css';

type SlugProps = {
  // This needs an overhaul. Can be too many things in my opinion (*Marcel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // data: RedirectResponse | PageDataResponse | ResponseError | { ok: string; message: string } | string;
  locale: string;
};

export default function Slug({ data }: SlugProps) {
  const { formatMessage } = useFormat({ name: 'common' });

  if (!data || typeof data === 'string') {
    return (
      <>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">Internal Error</h1>
        <p className="mt-2 text-lg">{data}</p>
        <p className="mt-2 text-lg">Check the logs of your Frontastic CLI for more details.</p>
      </>
    );
  }

  if (!data?.ok && data?.message) {
    return (
      <>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">Internal Error</h1>
        <p className="mt-2 text-lg">{data.message}</p>
        <p className="mt-2 text-lg">Check the logs of your Frontastic CLI for more details.</p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'meta.title', defaultMessage: 'The Good Store' })}</title>
        <meta
          name="description"
          content={formatMessage({ id: 'meta.desc', defaultMessage: 'Find largest home collections here!' })}
        />
      </Head>
      <GASnippet />
      <FrontasticRenderer data={data} tastics={tastics} wrapperClassName={styles.gridWrapper} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps | Redirect = async ({
  params,
  locale,
  query,
  req,
  res,
  resolvedUrl,
}) => {
  SDK.configure(locale as string);

  const extensions = SDK.getExtensions();

  const frontastic = createClient();
  const [data, categories] = await Promise.all([
    frontastic.getRouteData(params ?? {}, locale as string, query, req, res),
    extensions.product.queryCategories({ query: { limit: 99 } }).then((res) => (res.isError ? [] : res.data)),
  ]);

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

  const protocol = req.headers.referer?.split('://')[0] || 'https';

  const serverUrl = `${protocol}://${req.headers.host}${resolvedUrl}`;

  /* Algolia */
  const categoryId = (params?.slug as string[])?.[(params?.slug?.length as number) - 1];

  const searchQuery = (query.q as string) ?? '';

  const plpTasticKey = 'commercetools/ui/products/product-list';

  const plpConfiguration = ((data as PageDataResponse).page.sections.main.layoutElements
    .find((layoutElement) => layoutElement.tastics.find((tastic) => tastic.tasticType === plpTasticKey))
    ?.tastics.find((tastic) => tastic.tasticType === plpTasticKey)?.configuration ?? {}) as Partial<
    ProductListTasticProps['data']
  >;

  if (categoryId) plpConfiguration.categoryId = categoryId;
  if (searchQuery) plpConfiguration.searchQuery = searchQuery;

  return {
    props: {
      data: { ...data, categories, serverUrl } || null,
      locale: locale,
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
