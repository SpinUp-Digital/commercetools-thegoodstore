import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import { mapSDKLanguage } from 'project.config';

const useMarket = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [market, setMarket] = useState<Market>();
  const router = useRouter();

  const getCountryAndCurrency = (country: string) => {
    switch (country) {
      case 'en-GB':
        return { countryName: 'GB', currency: 'GBP', currencyCode: '£' };
      default:
        return { countryName: 'DE', currency: 'EUR', currencyCode: '€' };
    }
  };

  const handleMarket = (market: Market) => {
    setMarket(market);

    router.push(router.asPath, router.asPath, { locale: market.locale.substring(0, 2) });
  };

  useEffect(() => {
    const initialMarkets = router.locales?.map((locale) => ({
      region: getCountryAndCurrency(mapSDKLanguage(locale)).countryName,
      flag: getCountryAndCurrency(mapSDKLanguage(locale)).countryName,
      locale: mapSDKLanguage(locale),
      currency: getCountryAndCurrency(mapSDKLanguage(locale)).currency,
      currencyCode: getCountryAndCurrency(mapSDKLanguage(locale)).currencyCode,
    }));

    if (!initialMarkets) return;

    setMarkets(initialMarkets);

    let initialMarket = initialMarkets.find((market) => market.locale.substring(0, 2) === router.locale);
    if (!initialMarket) {
      initialMarket = initialMarkets.find((market) => market.locale.substring(0, 2) === router.defaultLocale);
    }

    setMarket(initialMarket);
  }, [router.locale, router.defaultLocale, router.locales]);

  return { market, markets, handleMarket };
};

export default useMarket;
