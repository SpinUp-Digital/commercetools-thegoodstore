import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from 'components/commercetools-ui/organisms/header';
import { useRouter } from 'next/router';
import { useCart } from 'frontastic/provider';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import AnnouncementBar from 'components/commercetools-ui/organisms/bar/announcement';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import useResizeObserver from 'helpers/hooks/useResizeObserver';

const HeaderTastic = ({ data, categories }) => {
  const headerRef = useRef(null);
  const { getProjectSettings } = useCart();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [market, setMarket] = useState<Market>(undefined);
  const router = useRouter();
  const [screenWidth] = useMediaQuery();

  const getCurrency = (country: string) => {
    switch (country) {
      case 'GB':
        return { currency: 'GBP', currencyCode: '£' };
      default:
        return { currency: 'EUR', currencyCode: '€' };
    }
  };

  const setPaddingTop = useCallback(() => {
    if (headerRef.current) {
      document.body.style.paddingTop = `${headerRef.current.clientHeight - 1}px`;
    }
  }, [screenWidth]);

  useResizeObserver(headerRef, setPaddingTop);

  useEffect(() => {
    getProjectSettings().then((data) => {
      const initialMarkets = data.countries.map((country, index) => ({
        region: country,
        flag: country,
        locale: data.languages[index],
        currency: getCurrency(country).currency,
        currencyCode: getCurrency(country).currencyCode,
      }));
      setMarkets(initialMarkets);

      let initialMarket = initialMarkets.find((market) => market.locale.substring(0, 2) === router.locale);
      if (!initialMarket) {
        initialMarket = initialMarkets.find((market) => market.locale.substring(0, 2) === router.defaultLocale);
      }

      setMarket(initialMarket);
    });
  }, []);

  const handleMarket = (market: Market) => {
    setMarket(market);

    router.push(router.asPath, router.asPath, { locale: market.locale.substring(0, 2) });
  };

  const flattenedCategories = categories?.items?.filter((category) => category.depth === 0);

  const announcementBarData = {
    text: data.text,
    highlightedSubstring: data.highlightedSubstring,
    target: data.target,
  };

  return (
    <div className="fixed top-0 z-50 w-full" ref={headerRef}>
      {announcementBarData && <AnnouncementBar {...data} />}
      <Header
        links={flattenedCategories}
        markets={markets}
        market={market}
        logo={data.logo}
        logoLink={data.logoLink}
        tiles={data.tiles}
        handleMarket={handleMarket}
        emptyCartTitle={data.emptyCartTitle}
        emptyCartSubtitle={data.emptyCartSubtitle}
        emptyCartImage={data.emptyCartImage}
        emptyCartCategories={data.emptyCartCategories}
        emptyWishlistTitle={data.emptyWishlistTitle}
        emptyWishlistSubtitle={data.emptyWishlistSubtitle}
        emptyWishlistImage={data.emptyWishlistImage}
        emptyWishlistCategories={data.emptyWishlistCategories}
      />
    </div>
  );
};
export default HeaderTastic;
