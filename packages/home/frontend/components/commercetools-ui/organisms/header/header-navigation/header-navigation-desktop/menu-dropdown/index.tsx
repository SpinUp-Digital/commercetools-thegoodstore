import React, { FC } from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { Market, Tile } from '../../../types';
import HeaderDropdownTile from './header-menu-tile';

export interface Props {
  show: boolean;
  links: Category[];
  market: Market;
  tileContent?: Tile;
  onClick?: () => void;
}

const MenuDropdown: FC<Props> = ({ show, links, tileContent, market, onClick }) => {
  const wrapperClassNames = useClassNames([
    'animate-[appear_1s_ease-in-out]',
    'absolute bottom-0 left-0 z-20 h-fit w-full translate-y-full',
    tileContent ? 'justify-between' : 'justify-center',
    show ? 'flex' : 'hidden',
    'border-b-[1.5px] border-t-[1.5px] border-b-secondary-grey border-t-neutral-400 bg-white px-50 py-34 xl:pl-143 xl:pr-195',
  ]);
  const linksClassNames = useClassNames([
    'w-[65%] justify-left lg:grid lg:grid-cols-2 xl:flex',
    links?.length > 4 ? 'xl:grid xl:grid-cols-2' : '',
    tileContent ? 'pr-25' : '',
  ]);

  return (
    <div className={wrapperClassNames}>
      <div className={linksClassNames}>
        {links?.map((link) => (
          <div key={link.categoryId} className="pr-116">
            {link.depth === 1 ? (
              <>
                <div className="w-min pb-8">
                  <Link link={link.slug ?? link.path} variant="menu-header" className="whitespace-nowrap">
                    {link.name}
                  </Link>
                </div>
                {link.subCategories.map((field) => (
                  <div key={field.categoryId} onClick={onClick} className="w-min pb-8">
                    <Link link={field.slug ?? field.path} variant="menu-item" className="whitespace-nowrap">
                      {field.name}
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <Link key={link.categoryId} link={link.slug ?? link.path} variant="menu-header">
                <Typography>{link.name}</Typography>
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
