import { useMemo } from 'react';
import { useRouter } from 'next/router';

const useI18n = () => {
  const router = useRouter();

  const country = useMemo(
    () =>
      ({
        en: 'GB',
        de: 'DE',
      }[router?.locale]),
    [router?.locale],
  );

  const currency = useMemo(
    () =>
      ({
        de: 'eur',
        en: 'sterling',
      }[router?.locale]),
    [router?.locale],
  );

  const currencySymbol = useMemo(
    () =>
      ({
        eur: '€',
        sterling: '£',
      }[currency]),
    [currency],
  );

  return { country, currency, currencySymbol };
};

export default useI18n;
