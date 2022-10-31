import React, { FC } from 'react';
import { Category } from '@Types/product/Category';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { Market, Tile } from '../../header-types';
import HeaderMenuTileDesktop from './header-menu-tile-desktop';

export interface Props {
  links: Category[];
  currentMarket: Market;
  tileContent?: Tile;
  onClick?: () => void;
}

const HeaderMenuDesktop: FC<Props> = ({ links, tileContent, currentMarket, onClick }) => {
  const wrapperClassNames = useClassNames([
    'absolute bottom-0 left-0 z-20 flex h-fit w-full translate-y-full',
    tileContent ? 'justify-between' : 'justify-center',
    'border-b-[1.5px] border-t-[1.5px] border-b-neutral-500 border-t-neutral-400 bg-white px-50 py-34 xl:pl-140 xl:pr-186',
  ]);
  const linksClassNames = useClassNames([
    'w-1/2 justify-between lg:grid lg:grid-cols-2 xl:flex',
    tileContent ? 'pr-25' : '',
  ]);
  return (
    <div className={wrapperClassNames}>
      <div className={linksClassNames}>
        {links?.map((link) => (
          <div key={link.categoryId} className="w-200">
            {link.depth === 1 ? (
              <div key={link.categoryId}>
                <div className="w-3/4 overflow-visible text-14 font-medium text-primary-black xl:w-full">
                  <Link link={link.slug ?? link.path}>{link.name}</Link>
                </div>
                {link.subCategories.map((field) => (
                  <div key={field.categoryId} onClick={onClick} className="my-4 cursor-pointer">
                    <Link link={field.slug ?? field.path}>
                      <Typography
                        as="p"
                        fontSize={14}
                        fontWeight="light"
                        className="h-22 w-fit border-secondary-black text-secondary-black hover:border-b-[1px]"
                      >
                        {field.name}
                      </Typography>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <Link key={link.categoryId} link={link.slug ?? link.path}>
                <Typography as="p" fontSize={14} fontWeight="medium" className="cursor-pointer text-primary-black">
                  {link.name}
                </Typography>
              </Link>
            )}
          </div>
        ))}
      </div>
      {tileContent && (
        <HeaderMenuTileDesktop
          title={tileContent.tileHeaderText}
          image={tileContent.tileImage}
          buttonLabel={tileContent.tileButtonLabel}
          buttonLink={tileContent.tileButtonLink}
          currentMarket={currentMarket}
        />
      )}
    </div>
  );
};

export default HeaderMenuDesktop;
