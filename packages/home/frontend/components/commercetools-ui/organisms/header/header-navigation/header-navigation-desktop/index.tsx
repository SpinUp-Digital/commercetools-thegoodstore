import React from 'react';
import HeaderNavigationButtonDesktop from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop/header-navigation-button';
import { Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';
import useScrollDirection from 'helpers/hooks/useScrollDirection';
import { Category } from 'types/category';

export interface Props {
  links: Category[];
  handleMouseIn: (category: Category) => void;
  handleMouseOut: () => void;
  activeCategory: Category;
  tiles: Tile[];
  hideSubMenu: () => void;
}

const HeaderNavigationDesktop: React.FC<Props> = ({
  links,
  handleMouseIn,
  handleMouseOut,
  activeCategory,
  tiles,
  hideSubMenu,
}) => {
  const scrollDirection = useScrollDirection(5, -1);
  const navigationClassNames = useClassNames([
    'relative hidden items-center justify-center lg:flex transition-all duration-150',
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
