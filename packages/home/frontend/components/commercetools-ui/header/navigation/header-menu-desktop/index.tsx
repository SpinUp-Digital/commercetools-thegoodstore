import React, { FC } from 'react';
import Link from 'next/link';
import { Category } from '@Types/product/Category';
import { Tile } from '../..';
import { Market } from '../../interfaces';
import HeaderMenuTileDesktop from './header-menu-tile-desktop';

export interface Props {
  navLinks: Category[];
  currentMarket: Market;
  tileContent?: Tile;
  onClick?: () => void;
}

const HeaderMenuDesktop: FC<Props> = ({ navLinks, tileContent, currentMarket, onClick }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 z-20 flex h-fit w-full translate-y-full ${
        tileContent ? 'justify-between' : 'justify-center'
      } border-b-[1.5px] border-t-[1.5px] border-b-secondary-grey border-t-neutral-400 bg-white px-50 py-34 xl:px-96`}
    >
      <div className={`w-1/2 justify-between lg:grid lg:grid-cols-2 xl:flex ${tileContent ? 'pr-25' : ''}`}>
        {navLinks.map((navLink) => (
          <div className="w-200" key={navLink.categoryId}>
            {navLink.depth === 1 ? (
              <div key={navLink.categoryId}>
                <div className="w-3/4 overflow-visible text-14 font-medium text-primary-black xl:w-full">
                  <Link href={navLink.slug ? navLink.slug : navLink.path} passHref>
                    {navLink.name}
                  </Link>
                </div>
                {navLink.subCategories.map((field) => (
                  <div key={field.categoryId} onClick={onClick} className="my-4 cursor-pointer">
                    <Link href={field.slug ? field.slug : field.path} passHref>
                      <div
                        onClick={() => console.log(field.path)}
                        className="h-22 w-fit border-secondary-black text-14 font-light text-secondary-black hover:border-b-[1px]"
                      >
                        {field.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <Link key={navLink.categoryId} href={navLink.slug ? navLink.slug : navLink.path} passHref>
                <div className="cursor-pointer text-14 font-medium text-primary-black">{navLink.name}</div>
              </Link>
            )}
          </div>
        ))}
      </div>
      {tileContent && (
        <HeaderMenuTileDesktop
          title={tileContent.tileHeader}
          image={tileContent.tileImage}
          buttonLabel={tileContent.tileButton.name}
          buttonLink={tileContent.tileButton.reference}
          currentMarket={currentMarket}
        />
      )}
    </div>
  );
};

export default HeaderMenuDesktop;
