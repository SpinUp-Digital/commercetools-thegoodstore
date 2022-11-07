import React, { FC, useState } from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import { Bars3Icon } from '@heroicons/react/24/outline';
import MobileMenu from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-mobile/menu-mobile';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import MarketButtonMobile from 'components/commercetools-ui/organisms/market-button/market-button-mobile';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';

export interface Props {
  links: Category[];
  market: Market;
  markets: Market[];
  handleMarket: (market: Market) => void;
}

const HeaderNavigationMobile: FC<Props> = ({ links, market, markets, handleMarket }) => {
  const [category, setCategory] = useState<Category[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const { formatMessage } = useFormat({ name: 'common' });

  const showHeaderMenu = () => {
    setShowMenu(true);
  };

  const hideHeaderMenu = () => {
    setShowMenu(false);
    setCategory([]);
  };

  const menuClassNames = useClassNames([
    'delay-50 fixed top-0 z-20 h-full w-4/5 bg-neutral-200 opacity-100 transition duration-500 ease-in-out',
    showMenu ? 'left-0 translate-x-0' : '-translate-x-[1000px]',
  ]);

  return (
    <div className="flex md:w-109 lg:hidden">
      <button
        onClick={showHeaderMenu}
        title={formatMessage({ id: 'header.menu.open', defaultMessage: 'Open side menu' })}
        className="h-fit w-fit"
      >
        <Bars3Icon className="w-30 text-secondary-black" />
      </button>
      {showMenu && (
        <div onClick={hideHeaderMenu} className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-50" />
      )}
      <div className={menuClassNames}>
        <MobileMenu links={links} hideHeaderMenu={hideHeaderMenu} category={category} setCategory={setCategory} />
        <>
          {category.length <= 0 && <MarketButtonMobile market={market} handleMarket={handleMarket} markets={markets} />}
        </>
      </div>
    </div>
  );
};

export default HeaderNavigationMobile;
