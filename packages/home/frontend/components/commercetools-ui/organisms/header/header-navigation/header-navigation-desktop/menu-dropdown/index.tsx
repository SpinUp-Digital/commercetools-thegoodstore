import React, { FC } from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { Market, Tile } from '../../../types';
import HeaderDropdownTile from './header-menu-tile';

export interface Props {
  links: Category[];
  market: Market;
  tileContent?: Tile;
  onClick?: () => void;
}

const MenuDropdown: FC<Props> = ({ links, tileContent, market, onClick }) => {
  const wrapperClassNames = useClassNames([
    'animate-[appear_1s_ease-in-out]',
    'absolute bottom-0 left-0 z-20 flex h-fit w-full translate-y-full',
    tileContent ? 'justify-between' : 'justify-center',
    'border-b-[1.5px] border-t-[1.5px] border-b-secondary-grey border-t-neutral-400 bg-white px-50 py-34 xl:pl-143 xl:pr-195',
  ]);
  const linksClassNames = useClassNames([
    'w-[65%] justify-between lg:grid lg:grid-cols-2 xl:flex',
    links?.length > 4 ? 'xl:grid xl:grid-cols-2' : '',
    tileContent ? 'pr-25' : '',
  ]);
  return (
    <div className={wrapperClassNames}>
      <div className={linksClassNames}>
        {links?.map((link) => (
          <div key={link.categoryId} className="w-185 lg:w-200">
            {link.depth === 1 ? (
              <div key={link.categoryId}>
                <div className="w-3/4 overflow-visible text-primary-black xl:w-full">
                  <Link link={link.slug ?? link.path}>
                    <Typography as="p" fontSize={14} fontWeight="medium">
                      {link.name}
                    </Typography>
                  </Link>
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
      {tileContent && <HeaderDropdownTile tileContent={tileContent} market={market} />}
    </div>
  );
};

export default MenuDropdown;
