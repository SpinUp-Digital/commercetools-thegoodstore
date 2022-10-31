import React, { useEffect, useState } from 'react';
import Header from 'components/commercetools-ui/organisms/header';
import { useRouter } from 'next/router';
import { useCart, useWishlist, useAccount } from 'frontastic/provider';
import { Market } from 'components/commercetools-ui/organisms/header/header-types';
import useScrollDirection from 'helpers/hooks/useScrollDirection';
import AnnouncementBar from 'components/commercetools-ui/organisms/bar/announcement';
import useClassNames from 'helpers/hooks/useClassNames';

const HeaderTastic = ({ data, categories }) => {
  const { getProjectSettings, totalItems: totalCartItems } = useCart();
  const { data: wishlist } = useWishlist();
  const { account } = useAccount();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [currentMarket, setCurrentMarket] = useState<Market>(undefined);
  const scrollDirection = useScrollDirection(15, -5);
  const router = useRouter();
  const headerClassName = useClassNames([
    scrollDirection === 'down' ? '-top-200' : 'top-0',
    'fixed w-full z-50 transition-all duration-500',
  ]);

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

      setCurrentMarket(initialMarket);
    });
  }, []);

  useEffect(() => {
    if (router.defaultLocale && markets.length > 0 && currentMarket === undefined) {
    }
  }, [router.defaultLocale, markets]);

  const handleCurrentMarket = (market: Market) => {
    setCurrentMarket(market);

    router.push(router.asPath, router.asPath, { locale: market.locale.substring(0, 2) });
  };

  const flattenedCategories = categories?.items?.filter((category) => category.depth === 0);

  const announcementBarData = {
    text: data.text,
    highlightedSubstring: data.highlightedSubstring,
    target: data.target,
  };

  return (
    <div className={headerClassName}>
      {announcementBarData && <AnnouncementBar {...data} />}
      <Header
        links={flattenedCategories}
        linksMobile={categories?.items}
        markets={markets}
        currentMarket={currentMarket}
        cartItemCount={totalCartItems}
        wishlistItemCount={wishlist?.lineItems?.length || 0}
        logo={data.logo}
        logoLink={data.logoLink}
        secondaryLogo={data.secondaryLogo}
        account={account}
        accountLink={data.accountLink}
        wishlistLink={data.wishlistLink}
        cartLink={data.cartLink}
        tiles={data.tiles}
        handleCurrentMarket={handleCurrentMarket}
      />
    </div>
  );
};
export default HeaderTastic;
