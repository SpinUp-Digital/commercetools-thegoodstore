import React from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import HeaderNavigationButtonDesktop from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop/header-navigation-button';
import { Market, Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';
import useScrollDirection from 'helpers/hooks/useScrollDirection';

export interface Props {
  links: Category[];
  handleMouseIn: (category: Category) => void;
  handleMouseOut: () => void;
  activeCategory: Category;
  tiles: Tile[];
  hideSubMenu: () => void;
  market: Market;
}

const HeaderNavigationDesktop = ({
  links,
  handleMouseIn,
  handleMouseOut,
  activeCategory,
  tiles,
  hideSubMenu,
  market,
}) => {
  const scrollDirection = useScrollDirection(5, -3);
  const navigationClassNames = useClassNames([
    'relative hidden items-center justify-center lg:flex transition-all duration-400',
    scrollDirection === 'down' ? 'h-0 opacity-0 pointer-events-none' : 'h-64 opacity-1 pointer-events-auto',
  ]);

  return (
    <>
      {links && (
        <div onMouseLeave={handleMouseOut} className={navigationClassNames}>
          {links.map((link) => (
            <div
              key={link?.categoryId}
              onMouseEnter={() => {
                handleMouseIn(link);
              }}
            >
              <HeaderNavigationButtonDesktop
                show={link.categoryId === activeCategory?.categoryId}
                link={link}
                market={market}
                updateSubMenu={hideSubMenu}
                tiles={tiles}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HeaderNavigationDesktop;
