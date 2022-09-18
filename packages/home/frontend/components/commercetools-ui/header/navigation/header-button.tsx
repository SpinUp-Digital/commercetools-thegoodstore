import React, { FC, useState } from 'react';
import { ReferenceLink } from 'helpers/reference';
import { Category, Link } from '../interfaces';
import HeaderMenuDesktop from './header-menu-desktop';

export interface Props {
  link: Category;
  navTileImage: string;
  navTileHeader: string;
  navTileButton: Link;
}

const HeaderButton: FC<Props> = ({ link, navTileImage, navTileHeader, navTileButton }) => {
  const [show, setShow] = useState(false);
  return (
    <div aria-expanded={false} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="mx-20">
      <ReferenceLink target={link.navLink.reference} className="py-25">
        <span className={`border-black py-10 text-16 ${show && 'border-b-2'}`}> {link.navLink.name}</span>
      </ReferenceLink>

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
export default HeaderButton;
