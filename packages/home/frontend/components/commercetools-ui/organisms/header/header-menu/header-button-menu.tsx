import React, { FC } from 'react';
import { Category } from '@Types/product/Category';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { Market, Tile } from '../header-types';
import HeaderMenuDesktop from './header-menu-desktop';

export interface Props {
  show: boolean;
  link: Category;
  tileContent?: Tile;
  currentMarket: Market;
  updateSubMenu: () => void;
}

const HeaderButtonMenu: FC<Props> = ({ show, link, tileContent, currentMarket, updateSubMenu }) => {
  const linkClassNames = useClassNames(['border-secondary-grey py-8', show ? 'border-b-2' : '']);
  return (
    <>
      <div className="mx-20 cursor-pointer py-20">
        <Typography as="span" fontSize={16} className={linkClassNames}>
          {link?.name}
        </Typography>
      </div>
      {show && (
        <HeaderMenuDesktop
          onClick={updateSubMenu}
          links={link?.subCategories}
          currentMarket={currentMarket}
          tileContent={tileContent}
        />
      )}
    </>
  );
};
export default HeaderButtonMenu;
