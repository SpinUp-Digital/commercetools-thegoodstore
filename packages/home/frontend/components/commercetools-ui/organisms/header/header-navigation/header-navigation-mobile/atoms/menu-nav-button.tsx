import React, { FC } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Category } from 'types/category';

export interface Props {
  link: Category;
  onClick: () => void;
  hideHeaderMenu: () => void;
}

const MobileMenuNavButton: FC<Props> = ({ link, onClick, hideHeaderMenu }) => {
  return (
    <div key={link.categoryId} className="cursor-pointer">
      {link?.subCategories?.length > 0 ? (
        <div onClick={onClick} className="flex justify-between py-24">
          <Typography fontSize={link?.depth && link?.depth > 0 ? 14 : 16} className="text-primary-black">
            {link.name}
          </Typography>
          <ChevronRightIcon className="w-20 text-secondary-black" />
        </div>
      ) : (
        <div onClick={hideHeaderMenu}>
          <Link link={link.slug ?? link.path} className="flex justify-between py-24">
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
