import React, { createContext, useCallback, useRef } from 'react';
import Header from 'components/commercetools-ui/organisms/header';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import AnnouncementBar from 'components/commercetools-ui/organisms/bar/announcement';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import useResizeObserver from 'helpers/hooks/useResizeObserver';
import { MarketProvider } from 'frontastic/provider/marketProvider';

const initialMarketState = {
  market: {} as Market,
  markets: [] as Market[],
  handleMarket: {} as (market: Market) => void,
};
export const MarketContext = createContext(initialMarketState);

const HeaderTastic = ({ data, categories }) => {
  const headerRef = useRef(null);
  const [screenWidth] = useMediaQuery();

  const setPaddingTop = useCallback(() => {
    if (headerRef.current) {
      document.body.style.paddingTop = `${headerRef.current.clientHeight - 1}px`;
    }
  }, [screenWidth]);

  useResizeObserver(headerRef, setPaddingTop);

  const flattenedCategories = categories?.items?.filter((category) => category.depth === 0);

  const announcementBarData = {
    text: data.text,
    highlightedSubstring: data.highlightedSubstring,
    target: data.target,
  };

  return (
    <MarketProvider>
      <div className="fixed top-0 z-50 w-full" ref={headerRef}>
        {announcementBarData && <AnnouncementBar {...data} />}
        <Header
          links={flattenedCategories}
          logo={data.logo}
          logoLink={data.logoLink}
          tiles={data.tiles}
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
    </MarketProvider>
  );
};
export default HeaderTastic;
