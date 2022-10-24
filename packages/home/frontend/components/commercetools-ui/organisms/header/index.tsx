import React, { useState, useRef, useEffect } from 'react';
import { Category } from '@Types/product/Category';
import Image from 'frontastic/lib/image';
import Link from '../../atoms/link';
import MarketButton from './market/market-button';
import HeaderButtonMenu from './navigation/header-button-menu';
import HeaderMenuMobile from './navigation/header-menu-mobile';
import UtilitySection from './navigation/utility-section';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  links,
  linksMobile,
  markets,
  currentMarket,
  cartItemCount,
  wishlistItemCount,
  logo,
  logoLink,
  secondaryLogo,
  account,
  accountLink,
  wishlistLink,
  cartLink,
  tiles,
  handleCurrentMarket,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>(undefined);

  const showSubMenu = (category?: Category) => {
    setActiveCategory(category);
  };
  const hideSubMenu = () => {
    setActiveCategory(undefined);
  };

  const showTimeout = useRef<NodeJS.Timer>(null);

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
    <header className={`h-fit w-full border-b-[1.5px] border-neutral-400 bg-white`}>
      <nav
        aria-label="Top"
        className="mx-13 flex h-60 items-center justify-between md:mx-30 md:h-76 lg:mx-10 xl:mx-50 "
      >
        <MarketButton currentMarket={currentMarket} markets={markets} handleCurrentMarket={handleCurrentMarket} />

        <HeaderMenuMobile
          navLinks={linksMobile}
          language={currentMarket}
          languages={markets}
          handleCurrentMarket={handleCurrentMarket}
        />

        <div className="relative mb-10 px-10 md:mt-0">
          <Link
            className="flex h-95 w-125 justify-center text-center text-16 font-bold md:h-76 md:w-214 md:text-28"
            link={logoLink}
          >
            {logo ? (
              <Image media={logo.media} layout="fill" objectFit="contain" alt={logo.title[currentMarket?.locale]} />
            ) : (
              'The Good Home'
            )}
          </Link>
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

        <UtilitySection
          account={account}
          accountLink={accountLink}
          cartLink={cartLink}
          wishlistLink={wishlistLink}
          cartItemCount={cartItemCount}
          wishlistItemCount={wishlistItemCount}
        />
      </nav>

      {links && (
        <nav onMouseLeave={handleMouseOut} className="relative hidden h-64 items-center justify-center lg:flex">
          {links.map((link, index) => (
            <div key={link?.categoryId} onMouseEnter={() => handleMouseIn(link)}>
              <HeaderButtonMenu
                show={link.categoryId === activeCategory?.categoryId}
                link={link}
                tileContent={tiles[index]}
                updateSubMenu={hideSubMenu}
                currentMarket={currentMarket}
              />
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};
export default Header;
