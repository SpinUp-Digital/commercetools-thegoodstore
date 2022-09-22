import React, { FC } from 'react';
import Link from 'next/link';
import { Category } from '@Types/product/Category';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import { Link as TileLink } from '../../interfaces';
import HeaderMenuTileDesktop from './header-menu-tile-desktop';

export interface Props {
  navigation: Category[];
  tileImage: string;
  tileHeader: string;
  tileButton: TileLink;
  onClick?: () => void;
}

const HeaderMenuDesktop: FC<Props> = ({ navigation, tileImage, tileHeader, tileButton, onClick }) => {
  return (
    <div className="absolute top-192 left-0 z-10 flex h-fit w-full justify-between bg-white px-96 py-34">
      <div className="flex w-1/2 justify-between pr-25">
        {navigation.map((data) => (
          <div key={data.categoryId}>
            {data.subCategories.length > 0 ? (
              <div key={data.categoryId}>
                <div className="font-medium text-primary-black">{data.name}</div>
                {data.subCategories.map((field) => (
                  <div key={field.categoryId} onClick={onClick} className="cursor-pointer">
                    <Link href={field.slug ? field.slug : field.path} passHref>
                      <div
                        onClick={() => console.log(field.path)}
                        className="w-fit border-secondary-black text-14 font-light text-secondary-black hover:border-b-[1px]"
                      >
                        {field.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <Link key={data.categoryId} href={data.slug ? data.slug : data.path} passHref>
                <div className="cursor-pointer font-medium text-primary-black">{data.name}</div>
              </Link>
            )}
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
