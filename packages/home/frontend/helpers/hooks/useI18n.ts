import { useMemo } from 'react';
import { useRouter } from 'next/router';

const useI18n = () => {
  const router = useRouter();

  const country = useMemo(() => {
    const map = {
      en: 'GB',
      de: 'DE',
    };

    return map[router?.locale as keyof typeof map];
  }, [router?.locale]);

  const currency = useMemo(() => {
    const map = {
      de: 'EUR',
      en: 'GBP',
    };

    return map[router?.locale as keyof typeof map];
  }, [router?.locale]);

  const currencySymbol = useMemo(() => {
    const map = {
      EUR: '€',
      GBP: '£',
    };

    return map[currency as keyof typeof map];
  }, [currency]);

  return { country, currency, currencySymbol };
};

export default useI18n;
