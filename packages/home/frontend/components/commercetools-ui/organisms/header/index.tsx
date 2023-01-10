import React, { useState, useRef } from 'react';
import Search from 'components/commercetools-ui/atoms/search';
import HeaderLogo from 'components/commercetools-ui/organisms/header/header-logo';
import HeaderNavigationDesktop from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop';
import HeaderNavigationMobile from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-mobile';
import { HeaderProps } from 'components/commercetools-ui/organisms/header/types';
import UtilitySection from 'components/commercetools-ui/organisms/header/utility-section';
import MarketButton from 'components/commercetools-ui/organisms/market-button/market-button';
import { Category } from 'types/category';

const Header: React.FC<HeaderProps> = ({
  categories,
  logo,
  logoMobile,
  logoLink,
  logoLinkMobile,
  tiles,
  emptyCartTitle,
  emptyCartSubtitle,
  emptyCartImage,
  emptyCartCategories,
  emptyWishlistTitle,
  emptyWishlistSubtitle,
  emptyWishlistImage,
  emptyWishlistCategories,
}) => {
  const links = categories?.filter((category) => category.depth === 0);

  const [activeCategory, setActiveCategory] = useState<Category>();

  const showSubMenu = (category?: Category) => {
    setActiveCategory(category);
  };
  const hideSubMenu = () => {
    setActiveCategory(undefined);
  };

  const showTimeout = useRef<NodeJS.Timer | null>(null) as React.MutableRefObject<NodeJS.Timer | null>;

  const handleMouseIn = (category: Category) => {
    if (activeCategory) showSubMenu(category); //Already opened do not delay
    else showTimeout.current = setTimeout(() => showSubMenu(category), 300);
  };

  const handleMouseOut = () => {
    if (showTimeout.current) {
      clearTimeout(showTimeout.current);
      showTimeout.current = null;
    }
    hideSubMenu();
  };

  return (
    <header className="h-fit w-full border-b-[1.5px] border-neutral-400 bg-white">
      <div aria-label="Top" className="mx-5 flex h-60 items-center justify-between md:mx-22 md:h-80 lg:mx-10 xl:mx-50">
        <MarketButton />

        <HeaderNavigationMobile logo={logoMobile} links={links} logoLink={logoLinkMobile} />

        <HeaderLogo
          logo={logo}
          logoLink={logoLink}
          imageClassName="flex h-95 w-200 justify-center text-center text-16 font-bold md:h-76 md:w-214 md:text-28"
        />

        <UtilitySection
          emptyCartTitle={emptyCartTitle}
          emptyCartSubtitle={emptyCartSubtitle}
          emptyCartImage={emptyCartImage}
          emptyCartCategories={emptyCartCategories}
          emptyWishlistTitle={emptyWishlistTitle}
          emptyWishlistSubtitle={emptyWishlistSubtitle}
          emptyWishlistImage={emptyWishlistImage}
          emptyWishlistCategories={emptyWishlistCategories}
        />
      </div>

      <div className="relative border-t border-neutral-400 px-15 py-12 md:px-32 lg:px-20 xl:px-60">
        <Search categories={categories} />
      </div>

      <HeaderNavigationDesktop
        links={links}
        tiles={tiles ?? []}
        activeCategory={activeCategory as Category}
        handleMouseIn={handleMouseIn}
        handleMouseOut={handleMouseOut}
        hideSubMenu={hideSubMenu}
      />
    </header>
  );
};
export default Header;
