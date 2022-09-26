import React, { FC, useState } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { Category } from '@Types/product/Category';
import BackIcon from 'components/icons/back';
import CloseIcon from 'components/icons/close';
import MenuIcon from 'components/icons/menu-icon';
import useClassNames from 'helpers/hooks/useClassNames';
import { Market } from '../../interfaces';
import MarketButtonMobile from '../../market/market-button-mobile';

export interface Props {
  navigation: Category[];
  language: Market;
  languages: Market[];
  handleCurrentMarket: (market: Market) => void;
}

const HeaderMenuMobile: FC<Props> = ({ navigation, language, languages, handleCurrentMarket }) => {
  const [selected, setSelected] = useState<Category[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const { resolveClassNames } = useClassNames();

  const showHeaderMenu = () => {
    setShowMenu(true);
  };

  const hideHeaderMenu = () => {
    setShowMenu(false);
  };
  return (
    <div className="flex md:w-109 lg:hidden">
      <button onClick={showHeaderMenu} className="h-fit w-20">
        <MenuIcon />
      </button>
      {showMenu && <div className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-50" />}
      <div
        className={`delay-50 fixed top-0 z-20 h-full w-4/5 bg-neutral-200 opacity-100 transition ease-in-out ${
          showMenu ? 'left-0 translate-x-0' : '-translate-x-[1000px]'
        }`}
      >
        <div className="w-fill flex h-83 justify-between bg-neutral-400">
          {selected.length > 0 && (
            <button
              onClick={() => setSelected((array) => array.slice(0, -1))}
              className="flex h-full w-full items-center justify-start"
            >
              <BackIcon className="m-22" />
            </button>
          )}
          <button onClick={hideHeaderMenu} className="flex h-full w-full items-center justify-end">
            <CloseIcon className="m-22" />
          </button>
        </div>
        <>
          {selected.length <= 0 ? (
            navigation.map((link, index) => (
              <div
                key={link.categoryId}
                className={resolveClassNames([
                  'cursor-pointer border-neutral-400',
                  `${index < navigation.length - 1 && 'border-b-[1px]'}`,
                ])}
              >
                {link?.subCategories?.length > 0 ? (
                  <div
                    onClick={() => setSelected((array) => [...array, link])}
                    className="mx-20 my-12 flex h-24 justify-between text-16 font-medium"
                  >
                    {link.name} <ChevronRightIcon className="w-13" />
                  </div>
                ) : (
                  <Link href={link.slug ? link.slug : link.path}>
                    <div className="mx-20 my-12 flex h-24 justify-between text-16 font-medium">{link.name}</div>
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
                      {nav.name} <ChevronRightIcon className="w-13" />
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
