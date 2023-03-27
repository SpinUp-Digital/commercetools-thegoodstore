import React, { createContext, useCallback, useRef } from 'react';
import AnnouncementBar, { Props as AnnouncementBarProps } from 'components/commercetools-ui/organisms/announcement-bar';
import Header from 'components/commercetools-ui/organisms/header';
import { HeaderProps, Market } from 'components/commercetools-ui/organisms/header/types';
import { MarketProvider } from 'context/market';
import useResizeObserver from 'helpers/hooks/useResizeObserver';
import { Category } from 'types/category';

const initialMarketState = {
  market: {} as Market,
  markets: [] as Market[],
  handleMarket: {} as (market: Market) => void,
};
export const MarketContext = createContext(initialMarketState);

interface Props {
  data: HeaderProps & AnnouncementBarProps;
  categories: Category[];
}

const HeaderTastic = ({ data, categories }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);

  const setPaddingTop = useCallback(() => {
    if (headerRef.current) {
      document.body.style.paddingTop = `${headerRef.current.clientHeight - 1}px`;
    }
  }, []);

  const removePaddingTop = useCallback(() => (document.body.style.paddingTop = '0px'), []);

  useResizeObserver(headerRef, setPaddingTop, removePaddingTop);

  const announcementBarData = {
    text: data.text,
    highlightedSubstring: data.highlightedSubstring,
    target: data.target,
  };

  return (
    <MarketProvider>
      <div id="header-container" className="fixed top-0 z-50 w-full" ref={headerRef}>
        {announcementBarData && <AnnouncementBar {...announcementBarData} />}
        <Header
          navLinks={categories?.filter((category) => category.depth === 0)}
          categories={categories}
          logo={data.logo}
          logoLink={data.logoLink}
          logoMobile={data.logoMobile}
          logoLinkMobile={data.logoLinkMobile}
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
