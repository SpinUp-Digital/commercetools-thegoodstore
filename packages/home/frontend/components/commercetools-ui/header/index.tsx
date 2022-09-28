import React, { Dispatch, useState } from 'react';
import { Account } from '@Types/account/Account';
import { Category } from '@Types/product/Category';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import { Market, Link } from './interfaces';
import MarketButton from './market/market-button';
import HeaderButton from './navigation/header-button';
import HeaderButtonMenu from './navigation/header-button-menu';
import HeaderMenuMobile from './navigation/header-menu-mobile';
import UtilitySection from './navigation/utility-section';

export interface HeaderProps {
  links: Category[];
  linksMobile: Category[];
  markets: Market[];
  currentMarket: Market;
  cartItemCount: number;
  wishlistItemCount?: number;
  logo: NextFrontasticImage;
  logoLink: Reference;
  account: Account;
  accountLink: Reference;
  wishlistLink?: Reference;
  cartLink: Reference;
  navTileImage: NextFrontasticImage;
  navTileHeader: string;
  navTileButton: Link;
  handleCurrentMarket: (market: Market) => void;
}

const Header: React.FC<HeaderProps> = ({
  links,
  linksMobile,
  markets,
  currentMarket,
  logo,
  logoLink,
  account,
  accountLink,
  wishlistLink,
  cartLink,
  navTileImage,
  navTileHeader,
  navTileButton,
  handleCurrentMarket,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>(undefined);

  const showSubMenu = (category?: Category) => {
    setActiveCategory(category);
  };
  const hideSubMenu = () => {
    setActiveCategory(undefined);
  };
  return (
    <header className="h-fit border-b-2 border-neutral-400 bg-white">
      <nav aria-label="Top" className="mx-13 flex h-60 items-center justify-between md:mx-30 md:h-76 lg:mx-50">
        <MarketButton currentMarket={currentMarket} markets={markets} handleCurrentMarket={handleCurrentMarket} />

        <HeaderMenuMobile
          navigation={linksMobile}
          language={currentMarket}
          languages={markets}
          handleCurrentMarket={handleCurrentMarket}
        />

        <div className="relative mb-10 px-10 md:mt-0">
          <ReferenceLink
            className="relative block h-95 w-125 text-center text-16 font-bold md:h-76 md:w-214 md:text-28"
            target={logoLink}
          >
            {logo ? (
              <Image media={logo.media} layout="fill" objectFit="contain" alt={logo.title[currentMarket?.locale]} />
            ) : (
              'The Good Home'
            )}
            <div className="absolute left-1/2 bottom-0 mb-20 -translate-x-1/2 text-10 font-normal md:mb-0 md:text-14 ">
              HOME
            </div>
          </ReferenceLink>
        </div>

        <UtilitySection account={account} accountLink={accountLink} cartLink={cartLink} wishlistLink={wishlistLink} />
      </nav>

      {links && (
        <nav onMouseLeave={() => showSubMenu()} className="relative hidden h-64 items-center justify-center lg:flex">
          {links.map((link) => (
            <div onMouseEnter={() => showSubMenu(link)} key={link?.categoryId}>
              {link.subCategories?.length > 0 ? (
                <HeaderButtonMenu
                  show={link.categoryId === activeCategory?.categoryId}
                  link={link}
                  navTileImage={navTileImage}
                  navTileHeader={navTileHeader}
                  navTileButton={navTileButton}
                  updateSubMenu={hideSubMenu}
                  currentMarket={currentMarket}
                />
              ) : (
                <HeaderButton link={link} />
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};
export default Header;
