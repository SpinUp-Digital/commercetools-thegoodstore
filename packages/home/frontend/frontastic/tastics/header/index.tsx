import React, { useEffect, useRef, useState } from 'react';
import Header from 'components/commercetools-ui/organisms/header';
import { useRouter } from 'next/router';
import { useCart, useWishlist, useAccount } from 'frontastic/provider';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import AnnouncementBar from 'components/commercetools-ui/organisms/bar/announcement';
import useMediaQuery from 'helpers/hooks/useMediaQuery';

const HeaderTastic = ({ data, categories }) => {
  const headerRef = useRef(null);
  const { getProjectSettings } = useCart();
  const { account } = useAccount();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [market, setMarket] = useState<Market>(undefined);
  const router = useRouter();
  const [screenWidth] = useMediaQuery();

  useEffect(() => {
    if (headerRef.current) {
      document.body.style.paddingTop = `${headerRef.current.clientHeight}px`;
    }
  }, [screenWidth]);

  useEffect(() => {
    getProjectSettings().then((data) => {
      const initialMarkets = data.countries.map((country, index) => ({
        region: country,
        flag: country,
        locale: data.languages[index],
        currency: 'EUR',
        currencyCode: '&#8364;',
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
        account={account}
        accountLink={data.accountLink}
        tiles={data.tiles}
        handleMarket={handleMarket}
      />
    </div>
  );
};
export default HeaderTastic;
