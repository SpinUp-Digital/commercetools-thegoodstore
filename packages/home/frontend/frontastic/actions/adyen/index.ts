/* eslint-disable react-hooks/rules-of-hooks*/

import { mutate } from 'swr';
import { fetchApiHub } from 'frontastic';

export const createSession = async (value: number, currency: string, returnUrl: string, locale: string) => {
  const payload = {
    amount: {
      value: value,
      currency: currency,
    },
    returnUrl,
  };

  const res = await fetchApiHub('/action/adyen/createSession', locale, { method: 'POST' }, payload);

  return res;
};

export const adyenCheckout = async (
  sessionId: string | string[],
  redirectResult: string | string[],
  locale: string,
): Promise<void> => {
  const payload = {
    sessionId: sessionId,
    redirectResult: redirectResult,
  };

  const res = await fetchApiHub(
    '/action/adyen/checkout',
    locale,
    {
      headers: {
        accept: 'application/json',
      },
      credentials: 'include',
      method: 'POST',
    },
    payload,
  );
  mutate('/action/cart/getCart', null);
  return res;
};
