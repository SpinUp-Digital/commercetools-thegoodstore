import React, { FC } from 'react';
import Link from 'components/commercetools-ui/atoms/link';
import { Category } from 'types/category';
import Typography from 'components/commercetools-ui/atoms/typography';
import MenuDropdown from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop/menu-dropdown';
import { Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';

export interface Props {
  show: boolean;
  link: Category;
  tiles: Tile[];
  updateSubMenu: () => void;
}

const HeaderNavigationButtonDesktop: FC<Props> = ({ show, link, tiles, updateSubMenu }) => {
  const linkClassNames = useClassNames(['border-secondary-grey py-8', show ? 'border-b-[1.5px]' : '']);
  const tileContent = tiles.filter((tile) => tile.tileCategory === link.name);

  return (
    <>
      <Link link={link.slug ?? link.path} title={link?.name} className="mx-20 cursor-pointer py-20">
        <Typography as="span" fontSize={16} className={linkClassNames}>
          {link?.name}
        </Typography>
      </Link>

      <MenuDropdown show={show} onClick={updateSubMenu} links={link?.subCategories} tileContent={tileContent[0]} />
    </>
  );
};
export default HeaderNavigationButtonDesktop;
