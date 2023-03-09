import React from 'react';
import { GetServerSideProps, Redirect } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { SDK } from 'sdk';
import { createClient, PageDataResponse, ResponseError } from 'frontastic';

type SlugProps = {
  // This needs an overhaul. Can be too many things in my opinion (*Marcel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // data: RedirectResponse | PageDataResponse | ResponseError | { ok: string; message: string } | string;
  locale: string;
};

export default function Slug({ data }: SlugProps) {
  return <>Fetch only page</>;
}

export const getServerSideProps: GetServerSideProps | Redirect = async ({ params, locale, query, req, res }) => {
  SDK.configure(locale as string);

  const frontastic = createClient();
  const [data] = await Promise.all([frontastic.getRouteData(params ?? {}, locale as string, query, req, res)]);

  return {
    props: {
      data: { ...data } || null,
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
        'orders',
        'thank-you',
      ])),
    },
  };
};
