import { useCallback } from 'react';
import { mutate } from 'swr';
import { fetchApiHub } from 'frontastic';
import { UseAdyenReturn } from './types';

const useAdyen = (): UseAdyenReturn => {
  const createSession = useCallback(async (value: number, currency: string, returnUrl: string, locale: string) => {
    const payload = {
      amount: {
        value: value,
        currency: currency,
      },
      returnUrl,
    };

    const res = await fetchApiHub('/action/adyen/createSession', locale, { method: 'POST' }, payload);

    return res;
  }, []);

  const adyenCheckout = useCallback(
    async (sessionId: string | string[], redirectResult: string | string[], locale: string): Promise<void> => {
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
    },
    [],
  );

  return { createSession, adyenCheckout };
};

export default useAdyen;
