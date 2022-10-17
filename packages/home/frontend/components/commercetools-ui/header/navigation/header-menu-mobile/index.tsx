import React, { FC, useMemo, useState } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Category } from '@Types/product/Category';
import BackIcon from 'components/icons/back';
import ChevronRightIcon from 'components/icons/chevron-right';
import CloseIcon from 'components/icons/close';
import MenuIcon from 'components/icons/menu-icon';
import { useFormat } from 'helpers/hooks/useFormat';
import { Market } from '../../interfaces';
import MarketButtonMobile from '../../market/market-button-mobile';

export interface Props {
  navLinks: Category[];
  language: Market;
  languages: Market[];
  handleCurrentMarket: (market: Market) => void;
}

const HeaderMenuMobile: FC<Props> = ({ navLinks, language, languages, handleCurrentMarket }) => {
  const [selected, setSelected] = useState<Category[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const depth = useMemo(() => {
    return 0;
  }, []);

  const { formatMessage } = useFormat({ name: 'common' });

  const showHeaderMenu = () => {
    setShowMenu(true);
  };

  const hideHeaderMenu = () => {
    setShowMenu(false);
  };
  return (
    <div className="flex md:w-109 lg:hidden">
      <button
        onClick={showHeaderMenu}
        title={formatMessage({ id: 'header.menu.open', defaultMessage: 'Open side menu' })}
        className="h-fit w-20"
      >
        <MenuIcon />
      </button>
      {showMenu && <div className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-50" />}
      <div
        className={`delay-50 fixed top-0 z-20 h-full w-4/5 bg-neutral-200 opacity-100 transition ease-in-out ${
          showMenu ? 'left-0 translate-x-0' : '-translate-x-[1000px]'
        }`}
      >
        <div className="w-fill flex h-83 justify-between bg-neutral-300">
          {selected.length > 0 && (
            <button
              onClick={() => setSelected((array) => array.slice(0, -1))}
              className="flex h-full w-full items-center justify-start"
            >
              <BackIcon className="h-7.5 m-22 w-18" />
            </button>
          )}
          <button
            onClick={hideHeaderMenu}
            title={formatMessage({ id: 'close', defaultMessage: 'Close' })}
            className="flex h-full w-full items-center justify-end"
          >
            <CloseIcon className="my-22 mx-25 h-12 w-12" />
          </button>
        </div>
        <>
          {selected.length <= 0 ? (
            navLinks
              .filter((navLink) => navLink.depth === depth)
              .map((navLink) => (
                <div key={navLink.categoryId} className="cursor-pointer border-b-[1px] border-neutral-400">
                  {navLink?.subCategories?.length > 0 ? (
                    <div
                      onClick={() => setSelected((array) => [...array, navLink])}
                      className="mx-20 my-12 flex h-24 justify-between text-16 font-medium"
                    >
                      {navLink.name} <ChevronRightIcon className="w-20" />
                    </div>
                  ) : (
                    <Link href={navLink.slug ? navLink.slug : navLink.path}>
                      <div className="mx-20 my-12 flex h-24 justify-between text-16 font-medium">{navLink.name}</div>
                    </Link>
                  )}
                </div>
              ))
          ) : (
            <>
              <div className="mx-20 my-18 flex h-24 justify-start text-16 font-medium">
                {selected[selected.length - 1].name}
              </div>
              {selected[selected.length - 1].subCategories.map((nav) => (
                <div key={nav.categoryId} className="cursor-pointer border-b-[1px] border-neutral-400">
                  {nav.subCategories.length > 0 ? (
                    <div
                      onClick={() => setSelected((array) => [...array, nav])}
                      className="mx-20 my-12 flex h-24 justify-between text-16 font-normal"
                    >
                      {nav.name} <ChevronRightIcon className="w-15" />
                    </div>
                  ) : (
                    <Link href={nav.slug ? nav.slug : nav.path}>
                      <div className="mx-20 my-12 flex h-24 justify-between text-16  font-normal">{nav.name}</div>
                    </Link>
                  )}
                </div>
              ))}
            </>
          )}
        </>
        <>
          {selected.length <= 0 && (
            <MarketButtonMobile
              currentMarket={language}
              handleCurrentMarket={handleCurrentMarket}
              markets={languages}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default HeaderMenuMobile;
