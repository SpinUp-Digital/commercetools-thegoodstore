import React, { FC } from 'react';
import { Category } from '@Types/product/Category';
import Typography from 'components/commercetools-ui/atoms/typography';
import MenuDropdown from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop/menu-dropdown';
import { Market, Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';

export interface Props {
  show: boolean;
  link: Category;
  tileContent: Tile;
  market: Market;
  updateSubMenu: () => void;
}

const HeaderNavigationButtonDesktop: FC<Props> = ({ show, link, tileContent, market, updateSubMenu }) => {
  const linkClassNames = useClassNames(['border-secondary-grey py-8', show ? 'border-b-[1.5px]' : '']);
  return (
    <>
      <div className="mx-20 cursor-pointer py-20">
        <Typography as="span" fontSize={16} className={linkClassNames}>
          {link?.name}
        </Typography>
      </div>
      {show && (
        <MenuDropdown onClick={updateSubMenu} links={link?.subCategories} market={market} tileContent={tileContent} />
      )}
    </>
  );
};
export default HeaderNavigationButtonDesktop;
