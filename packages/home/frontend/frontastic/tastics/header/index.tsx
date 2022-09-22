import React, { useEffect, useState } from 'react';
import Header from 'components/commercetools-ui/header';
import { calculateCartCount } from 'helpers/utils/calculateCartCount';
import { useCart, useWishlist, useAccount, useProduct } from 'frontastic/provider';
import { tileButton, tileHeader, tileImage } from './constant';
import countryToCurrency from 'country-to-currency';
import { Market } from 'components/commercetools-ui/header/interfaces';

const HeaderTastic = ({ data, categories }) => {
  const { data: cart, getProjectSettings } = useCart();
  const { data: wishlist } = useWishlist();
  const { account } = useAccount();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [currentMarket, setCurrentMarket] = useState<Market>(undefined);

  useEffect(() => {
    getProjectSettings().then((data) => {
      const initialMarkets = data.countries.map((country, index) => ({
        region: country,
        flag: country,
        locale: data.languages[index],
        currency: countryToCurrency[country],
        currencyCode:
          countryToCurrency[country] === 'EUR' ? '&#8364;' : countryToCurrency[country] === 'USD' ? '&#36;' : '&#163;',
      }));
      setMarkets(initialMarkets);
      setCurrentMarket(initialMarkets[0]);
    });
  }, []);

  return (
    <Header
      tagline={data.tagline}
      links={(categories as any)?.items}
      linksMobile={(categories as any)?.items}
      markets={markets}
      currentMarket={currentMarket}
      setCurrentMarket={setCurrentMarket}
      cartItemCount={calculateCartCount(cart?.lineItems) || 0}
      wishlistItemCount={wishlist?.lineItems?.length || 0}
      logo={data.logo}
      logoLink={data.logoLink}
      account={account}
      accountLink={data.accountLink}
      wishlistLink={data.wishlistLink}
      cartLink={data.cartLink}
      navTileImage={tileImage}
      navTileHeader={tileHeader}
      navTileButton={tileButton}
    />
  );
};
export default HeaderTastic;
