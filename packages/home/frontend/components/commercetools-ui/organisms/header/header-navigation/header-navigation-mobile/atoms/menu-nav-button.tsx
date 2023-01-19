import React, { FC } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { Category } from 'types/category';

export interface Props {
  link: Category;
  categoriesNavigator?: Category[];
  onClick: () => void;
  hideHeaderMenu: () => void;
}

const MobileMenuNavButton: FC<Props> = ({ link, categoriesNavigator, onClick, hideHeaderMenu }) => {
  const linkClassNames = useClassNames([
    'flex justify-between',
    categoriesNavigator?.length === 0 ? 'py-24' : link?.categoryId === 'myAccount' ? 'pb-16' : 'pb-24',
  ]);
  return (
    <div key={link.categoryId} className="cursor-pointer">
      {link?.subCategories?.length > 0 ? (
        <div onClick={onClick} className={linkClassNames}>
          <Typography fontSize={link?.depth && link?.depth > 0 ? 14 : 16} className="text-primary-black">
            {link.name}
          </Typography>
          <ChevronRightIcon className="w-20 text-secondary-black" />
        </div>
      ) : (
        <div onClick={hideHeaderMenu} className={linkClassNames}>
          <Link link={link.slug ?? link.path}>
            <Typography fontSize={link?.depth && link?.depth > 0 ? 14 : 16} className="text-primary-black">
              {link.name}
            </Typography>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenuNavButton;
