import React, { FC, useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import MenuDropdown from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop/menu-dropdown';
import { Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';
import { Category } from 'types/category';

export interface Props {
  show: boolean;
  link: Category;
  tiles: Tile[];
  updateSubMenu: () => void;
}

const HeaderNavigationButtonDesktop: FC<Props> = ({ show, link, tiles, updateSubMenu }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navIconLinkClassNames = useClassNames(['flex border-primary-black py-4', show ? 'border-b-[1.5px]' : '']);
  const tileContent = tiles.filter((tile) => tile.tileCategory === link.name);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <></>;

  return (
    <>
      <div onClick={updateSubMenu} className="py-12 pr-20">
        <div className={navIconLinkClassNames}>
          <Link link={link.slug ?? link.path} title={link?.name} className="cursor-pointer pr-10">
            <Typography as="span" fontSize={16}>
              {link?.name}
            </Typography>
          </Link>
          <ChevronDownIcon className="w-20 text-secondary-black" />
        </div>
      </div>

      <MenuDropdown show={show} onClick={updateSubMenu} links={link?.subCategories} tileContent={tileContent[0]} />
    </>
  );
};
export default HeaderNavigationButtonDesktop;
