import React, { FC } from 'react';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import { Link, Category } from '../../interfaces';
import HeaderMenuTileDesktop from './header-menu-tile-desktop';
export interface Props {
  navigation: Category[];
  tileImage: string;
  tileHeader: string;
  tileButton: Link;
  onClick?: () => void;
}

const HeaderMenuDesktop: FC<Props> = ({ navigation, tileImage, tileHeader, tileButton, onClick }) => {
  return (
    <div className="absolute top-163 left-0 z-10 flex h-fit w-full justify-between bg-white px-96 py-34">
      <div className="flex w-1/2 justify-between pr-25">
        {navigation.map((data, index) => (
          <div key={index}>
            <div className="font-medium text-primary-black">{data.title}</div>
            {data.subCategories.map((field, index) => (
              <div key={index} onClick={onClick}>
                <ReferenceLink
                  target={field.navLink.reference}
                  className="border-secondary-black text-14 font-light text-secondary-black hover:border-b-[1px]"
                >
                  {field.navLink.name}
                </ReferenceLink>
              </div>
            ))}
          </div>
        ))}
      </div>

      <HeaderMenuTileDesktop
        title={tileHeader}
        image={tileImage}
        buttonLabel={tileButton.name}
        buttonLink={tileButton.reference}
      />
    </div>
  );
};

export default HeaderMenuDesktop;
