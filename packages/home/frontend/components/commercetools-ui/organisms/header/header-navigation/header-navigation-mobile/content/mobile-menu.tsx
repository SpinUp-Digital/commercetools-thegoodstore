import React, { FC } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';
import { Category } from 'types/category';
import MobileMenuNavButton from '../atoms/menu-nav-button';

export interface Props {
  links: Category[];
  hideHeaderMenu: () => void;
  categories: Category[]; //This is a navigator where you push a subcategory to show it's contents
  insertCategory: (category: Category) => void;
}

const MobileMenu: FC<Props> = ({ links, categories, insertCategory, hideHeaderMenu }) => {
  const linksWrapperClassNames = useClassNames(['mx-20', categories.length <= 0 ? 'pl-4' : 'pl-12']);
  return (
    <div className={linksWrapperClassNames}>
      {categories.length <= 0 ? (
        links?.map((link) => (
          <MobileMenuNavButton
            key={link.categoryId}
            link={link}
            onClick={() => insertCategory(link)}
            hideHeaderMenu={hideHeaderMenu}
          />
        ))
      ) : (
        <div className="pt-12">
          {categories[categories.length - 1].subCategories.map((nav) => (
            <MobileMenuNavButton
              key={nav.categoryId}
              link={nav}
              onClick={() => insertCategory(nav)}
              hideHeaderMenu={hideHeaderMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
