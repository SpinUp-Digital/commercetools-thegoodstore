import React, { FC, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Drawer from 'components/commercetools-ui/atoms/drawer';
import { useFormat } from 'helpers/hooks/useFormat';
import { Category } from 'types/category';
import { Reference } from 'types/reference';
import { NextFrontasticImage } from 'frontastic/lib/image';
import MobileMenu from './content/mobile-menu';
import MobileMenuFooter from './content/mobile-menu-footer';
import MobileMenuHeader from './content/mobile-menu-header';

export interface Props {
  logo: NextFrontasticImage;
  logoLink: Reference;
  links: Category[];
}

const HeaderNavigationMobile: FC<Props> = ({ links, logo, logoLink }) => {
  const { formatMessage } = useFormat({ name: 'common' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const showHeaderMenu = () => {
    setShowMenu(true);
  };

  const hideHeaderMenu = () => {
    setShowMenu(false);
    setCategories([]);
  };

  const removeCategory = () => {
    setCategories((array) => array.slice(0, -1));
  };

  const insertCategory = (category: Category) => {
    setCategories((array) => [...array, category]);
  };

  return (
    <div className="flex border border-neutral-400 md:w-109 lg:hidden">
      <Button
        variant="secondary"
        size="icon"
        onClick={showHeaderMenu}
        title={formatMessage({ id: 'header.menu.open', defaultMessage: 'Open side menu' })}
      >
        <Bars3Icon className="w-30 text-secondary-black" />
      </Button>

      <Drawer
        isOpen={showMenu}
        direction="left"
        className="w-4/5 border border-neutral-400 bg-neutral-100"
        onClose={hideHeaderMenu}
      >
        <MobileMenuHeader
          categories={categories}
          hideHeaderMenu={hideHeaderMenu}
          logo={logo}
          logoLink={logoLink}
          onArrowClick={removeCategory}
        />

        <MobileMenu
          links={links}
          hideHeaderMenu={hideHeaderMenu}
          category={categories}
          insertCategory={insertCategory}
        />

        {categories.length <= 0 && <MobileMenuFooter hideHeaderMenu={hideHeaderMenu} insertCategory={insertCategory} />}
      </Drawer>
    </div>
  );
};

export default HeaderNavigationMobile;
