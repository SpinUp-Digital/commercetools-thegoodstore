import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import { getLocalizationInfo } from 'project.config';

const useMarket = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [market, setMarket] = useState<Market>();
  const router = useRouter();

  const handleMarket = (market: Market) => {
    setMarket(market);

    router.push(router.asPath, router.asPath, { locale: market.locale.substring(0, 2) });
  };

  useEffect(() => {
    const initialMarkets = router.locales?.map((nextLocale) => {
      const { locale, currency, currencyCode, countryCode, countryName } = getLocalizationInfo(nextLocale);

      return {
        locale,
        currencyCode,
        region: countryName,
        flag: countryCode,
        currency: currency,
      };
    });

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
