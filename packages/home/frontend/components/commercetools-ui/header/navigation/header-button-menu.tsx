import React, { FC } from 'react';
import { Category } from '@Types/product/Category';
import { Tile } from '..';
import { Market } from '../interfaces';
import HeaderMenuDesktop from './header-menu-desktop';

export interface Props {
  show: boolean;
  link: Category;
  tileContent?: Tile;
  currentMarket: Market;
  updateSubMenu: () => void;
}

const HeaderButtonMenu: FC<Props> = ({ show, link, tileContent, currentMarket, updateSubMenu }) => {
  return (
    <>
      <div className="mx-20 cursor-pointer py-20">
        <span className={`border-secondary-grey py-8 text-16 ${show ? 'border-b-2' : ''}`}>{link.name}</span>
      </div>
      {show && (
        <HeaderMenuDesktop
          onClick={updateSubMenu}
          navLinks={link.subCategories}
          currentMarket={currentMarket}
          tileContent={tileContent}
        />
      )}
    </>
  );
};
export default HeaderButtonMenu;
