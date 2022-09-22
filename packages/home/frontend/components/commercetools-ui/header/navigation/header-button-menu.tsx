import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Category } from '@Types/product/Category';
import { Link as TileLink } from '../interfaces';
import HeaderMenuDesktop from './header-menu-desktop';

export interface Props {
  link: Category;
  navTileImage: string;
  navTileHeader: string;
  navTileButton: TileLink;
}

const HeaderButtonMenu: FC<Props> = ({ link, navTileImage, navTileHeader, navTileButton }) => {
  const [show, setShow] = useState(false);
  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div className="mx-20 cursor-pointer py-20">
        <span className={`border-black py-10 text-16 ${show && 'border-b-2'} `}>{link.name}</span>
      </div>
      {show && (
        <HeaderMenuDesktop
          onClick={() => setShow(false)}
          navigation={link.subCategories}
          tileImage={navTileImage}
          tileHeader={navTileHeader}
          tileButton={navTileButton}
        />
      )}
    </div>
  );
};
export default HeaderButtonMenu;
