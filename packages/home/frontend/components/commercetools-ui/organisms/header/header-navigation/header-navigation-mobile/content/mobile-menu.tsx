import React, { FC } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';
import { Category } from 'types/category';
import MobileMenuNavButton from '../atoms/menu-nav-button';

export interface Props {
  links: Category[];
  hideHeaderMenu: () => void;
  category: Category[];
  insertCategory: (category: Category) => void;
}

const MobileMenu: FC<Props> = ({ links, category, insertCategory, hideHeaderMenu }) => {
  const linksWrapperClassNames = useClassNames(['mx-20 pt-2', category.length <= 0 ? 'pl-4' : 'pl-12']);
  return (
    <div className={linksWrapperClassNames}>
      {category.length <= 0 ? (
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
          {category[category.length - 1].subCategories.map((nav) => (
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
