import React, { FC } from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';
import HeaderDropdownTile from './header-menu-tile';

export interface Props {
  show: boolean;
  links: Category[];
  tileContent?: Tile;
  onClick?: () => void;
}

const MenuDropdown: FC<Props> = ({ show, links, tileContent, onClick }) => {
  const wrapperClassNames = useClassNames([
    'animate-[appear_1s_ease-in-out]',
    'absolute bottom-0 left-0 z-20 min-h-[300px] w-full translate-y-full',
    'justify-between',
    show ? 'flex' : 'hidden',
    'border-b-[1.5px] border-t-[1.5px] border-b-secondary-grey border-t-neutral-400 bg-white px-50 py-34 xl:pl-143 2xl:pr-195',
  ]);

  const linksClassNames = useClassNames(['grid grid-cols-4 gap-x-116 gap-y-28', tileContent ? 'pr-116' : '']);

  return (
    <div className={wrapperClassNames}>
      <div className={linksClassNames}>
        {links?.map((link) => (
          <div key={link.categoryId}>
            {link.depth === 1 ? (
              <>
                <div className="w-min pb-8">
                  <Link link={link.slug ?? link.path} variant="menu-header" className="whitespace-nowrap text-14">
                    <Typography fontSize={14}>{link.name}</Typography>
                  </Link>
                </div>
                {link.subCategories.map((field) => (
                  <div key={field.categoryId} onClick={onClick} className="w-min pb-8">
                    <Link link={field.slug ?? field.path} variant="menu-item" className="whitespace-nowrap">
                      <Typography fontSize={14}>{field.name}</Typography>
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <Link key={link.categoryId} link={link.slug ?? link.path} variant="menu-header">
                <Typography fontSize={14}>{link.name}</Typography>
              </Link>
            )}
          </div>
        ))}
      </div>
      {tileContent && <HeaderDropdownTile tileContent={tileContent} />}
    </div>
  );
};

export default MenuDropdown;
