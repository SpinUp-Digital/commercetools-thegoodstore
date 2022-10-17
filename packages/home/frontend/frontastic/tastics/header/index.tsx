import React, { useEffect, useState } from 'react';
import Header from 'components/commercetools-ui/header';
import { useRouter } from 'next/router';
import { useCart, useWishlist, useAccount } from 'frontastic/provider';
import countryToCurrency from 'country-to-currency';
import { Market } from 'components/commercetools-ui/header/interfaces';

const HeaderTastic = ({ data, categories }) => {
  const { getProjectSettings, totalItems: totalCartItems } = useCart();
  const { data: wishlist } = useWishlist();
  const { account } = useAccount();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [currentMarket, setCurrentMarket] = useState<Market>(undefined);

  const router = useRouter();

  useEffect(() => {
    getProjectSettings().then((data) => {
      const initialMarkets = data.countries.map((country, index) => ({
        region: country,
        flag: country,
        locale: data.languages[index],
        currency: countryToCurrency[country] === 'GBP' ? 'EUR' : countryToCurrency[country],
        currencyCode:
          countryToCurrency[country] === 'EUR' ? '&#8364;' : countryToCurrency[country] === 'USD' ? '&#36;' : '&#163;',
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

  return (
    <Header
      links={(categories as any)?.items}
      linksMobile={(categories as any)?.items}
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
      tileContent={{
        tileImage: data.tileImage,
        tileHeader: data.tileHeaderText,
        tileButton: {
          name: data.tileButtonLabel,
          reference: data.tileButtonLink,
        },
      }}
      handleCurrentMarket={handleCurrentMarket}
    />
  );
};
export default HeaderTastic;
