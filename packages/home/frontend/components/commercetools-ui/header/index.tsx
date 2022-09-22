import React, { Dispatch } from 'react';
import { Account } from '@Types/account/Account';
import { Category } from '@Types/product/Category';
import { Reference, ReferenceLink } from 'helpers/reference';
import { NextFrontasticImage } from 'frontastic/lib/image';
import { Market, Link } from './interfaces';
import MarketButton from './market/market-button';
import HeaderButton from './navigation/header-button';
import HeaderButtonMenu from './navigation/header-button-menu';
import HeaderMenuMobile from './navigation/header-menu-mobile';
import UtilitySection from './navigation/utility-section';

export interface HeaderProps {
  tagline?: string;
  links: Category[];
  linksMobile: Category[];
  markets: Market[];
  currentMarket: Market;
  setCurrentMarket: Dispatch<React.SetStateAction<Market>>;
  cartItemCount: number;
  wishlistItemCount?: number;
  logo: { media: NextFrontasticImage } | NextFrontasticImage;
  logoLink: Reference;
  account: Account;
  accountLink: Reference;
  wishlistLink?: Reference;
  cartLink: Reference;
  navTileImage: string;
  navTileHeader: string;
  navTileButton: Link;
}

const Header: React.FC<HeaderProps> = ({
  links,
  linksMobile,
  markets,
  currentMarket,
  setCurrentMarket,
  logoLink,
  account,
  accountLink,
  wishlistLink,
  cartLink,
  navTileImage,
  navTileHeader,
  navTileButton,
}) => {
  return (
    <div className="h-fit border-b-2 border-neutral-400 bg-white">
      <nav aria-label="Top" className="mx-13 flex h-60 items-center justify-between md:mx-30 md:h-76 lg:mx-50">
        <MarketButton currentMarket={currentMarket} markets={markets} setCurrentMarket={setCurrentMarket} />

        <HeaderMenuMobile
          navigation={linksMobile}
          language={currentMarket}
          setCurrentLanguage={setCurrentMarket}
          languages={markets}
        />

        <div className="relative mt-25 mb-10 flex h-fit w-fit flex-col items-center justify-center px-10 md:mt-0 md:h-76">
          <ReferenceLink className="h-45 text-center text-16 font-bold md:text-28" target={logoLink}>
            The Good Store
          </ReferenceLink>
          <div className="absolute bottom-10 text-10 font-normal md:bottom-5 md:text-14 ">HOME</div>
        </div>

        <UtilitySection account={account} accountLink={accountLink} cartLink={cartLink} wishlistLink={wishlistLink} />
      </nav>

      {links && (
        <nav className="hidden h-64 items-center justify-center lg:flex">
          {links.map((link) => (
            <div key={link?.categoryId}>
              {link.subCategories.length > 0 ? (
                <HeaderButtonMenu
                  link={link}
                  navTileImage={navTileImage}
                  navTileHeader={navTileHeader}
                  navTileButton={navTileButton}
                />
              ) : (
                <HeaderButton link={link} />
              )}
            </div>
          ))}
        </nav>
      )}
    </div>
  );
};
export default Header;
