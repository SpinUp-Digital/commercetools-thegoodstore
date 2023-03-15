import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { getLocalizationInfo } from 'project.config';

const useI18n = () => {
  const router = useRouter();

  const config = useMemo(() => getLocalizationInfo(router?.locale), [router?.locale]);

  const country = useMemo(() => config.countryCode, [config]);

  const currency = useMemo(() => config.currency, [config]);

  const currencySymbol = useMemo(() => config.currencyCode, [config]);

  return { country, currency, currencySymbol };
};

export default useI18n;
