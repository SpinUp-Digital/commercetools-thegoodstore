import React, { useState } from 'react';
import { Account } from '@Types/account/Account';
import { Category } from '@Types/product/Category';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import { Market, Link } from './interfaces';
import MarketButton from './market/market-button';
import HeaderButtonMenu from './navigation/header-button-menu';
import HeaderMenuMobile from './navigation/header-menu-mobile';
import UtilitySection from './navigation/utility-section';

export interface Tile {
  tileImage: NextFrontasticImage;
  tileHeader: string;
  tileButton: Link;
}
export interface HeaderProps {
  links: Category[];
  linksMobile: Category[];
  markets: Market[];
  currentMarket: Market;
  cartItemCount: number;
  wishlistItemCount?: number;
  logo: NextFrontasticImage;
  logoLink: Reference;
  secondaryLogo: NextFrontasticImage;
  account: Account;
  accountLink: Reference;
  wishlistLink?: Reference;
  cartLink: Reference;
  tileContent?: Tile;
  handleCurrentMarket: (market: Market) => void;
}

const Header: React.FC<HeaderProps> = ({
  links,
  linksMobile,
  markets,
  currentMarket,
  logo,
  logoLink,
  secondaryLogo,
  account,
  accountLink,
  wishlistLink,
  cartLink,
  tileContent,
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
          navLinks={linksMobile}
          language={currentMarket}
          languages={markets}
          handleCurrentMarket={handleCurrentMarket}
        />

        <div className="relative mb-10 px-10 md:mt-0">
          <ReferenceLink
            className="flex h-95 w-125 justify-center text-center text-16 font-bold md:h-76 md:w-214 md:text-28"
            target={logoLink}
          >
            {logo ? (
              <Image media={logo.media} layout="fill" objectFit="contain" alt={logo.title[currentMarket?.locale]} />
            ) : (
              'The Good Home'
            )}
          </ReferenceLink>
          <div className="absolute bottom-15 left-1/2 h-25 w-32 -translate-x-1/2 font-normal md:-bottom-5 md:w-44 md:text-14">
            {secondaryLogo ? (
              <Image
                media={secondaryLogo.media}
                layout="fill"
                objectFit="contain"
                alt={secondaryLogo.title[currentMarket?.locale]}
              />
            ) : (
              'Home'
            )}
          </div>
        </div>

        <UtilitySection account={account} accountLink={accountLink} cartLink={cartLink} wishlistLink={wishlistLink} />
      </nav>

      {links && (
        <nav onMouseLeave={() => showSubMenu()} className="relative hidden h-64 items-center justify-center lg:flex">
          {links.map((link) => (
            <div onMouseEnter={() => showSubMenu(link)} key={link?.categoryId}>
              {link.depth === 0 && (
                <HeaderButtonMenu
                  show={link.categoryId === activeCategory?.categoryId}
                  link={link}
                  tileContent={tileContent}
                  updateSubMenu={hideSubMenu}
                  currentMarket={currentMarket}
                />
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};
export default Header;
