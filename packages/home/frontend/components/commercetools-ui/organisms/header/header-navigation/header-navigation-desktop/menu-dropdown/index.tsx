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

const MenuDropdown: FC<Props> = ({ links, tileContent, market, onClick, show }) => {
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
  const linkClassNames = useClassNames(['w-fit whitespace-nowrap', links.length < 4 ? 'pr-116' : 'pr-75']);
  return (
    <div className={wrapperClassNames}>
      <div className={linksClassNames}>
        {links?.map((link) => (
          <div key={link.categoryId} className={linkClassNames}>
            {link.depth === 1 ? (
              <div key={link.categoryId}>
                <div className="w-fit pb-4">
                  <Link link={link.slug ?? link.path} variant="menu-header">
                    <Typography>{link.name}</Typography>
                  </Link>
                </div>
                {link.subCategories.map((field) => (
                  <div key={field.categoryId} onClick={onClick} className="py-4">
                    <Link link={field.slug ?? field.path} className="h-22 w-fit" variant="menu-item">
                      <Typography>{field.name}</Typography>
                    </Link>
                  </div>
                ))}
              </div>
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
