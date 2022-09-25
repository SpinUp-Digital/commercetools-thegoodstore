import React, { FC } from 'react';
import { Category } from '@Types/product/Category';
import { NextFrontasticImage } from 'frontastic/lib/image';
import { Link as TileLink, Market } from '../interfaces';
import HeaderMenuDesktop from './header-menu-desktop';

export interface Props {
  show: boolean;
  link: Category;
  navTileImage: NextFrontasticImage;
  navTileHeader: string;
  navTileButton: TileLink;
  currentMarket: Market;
  updateSubMenu: () => void;
}

const HeaderButtonMenu: FC<Props> = ({
  show,
  link,
  navTileImage,
  navTileHeader,
  navTileButton,
  currentMarket,
  updateSubMenu,
}) => {
  return (
    <>
      <div className="mx-20 cursor-pointer py-20">
        <span className={`border-black py-8 text-16 ${show ? 'border-b-2' : ''}`}>{link.name}</span>
      </div>
      {show && (
        <HeaderMenuDesktop
          onClick={updateSubMenu}
          navigation={link.subCategories}
          tileImage={navTileImage}
          tileHeader={navTileHeader}
          tileButton={navTileButton}
          currentMarket={currentMarket}
        />
      )}
    </>
  );
};
export default HeaderButtonMenu;
