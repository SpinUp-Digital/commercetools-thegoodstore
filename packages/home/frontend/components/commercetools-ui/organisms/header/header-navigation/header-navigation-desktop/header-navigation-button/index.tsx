import React, { FC, useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { Category } from 'types/category';

export interface Props {
  show: boolean;
  link: Category;
  updateSubMenu: () => void;
}

const HeaderNavigationButtonDesktop: FC<Props> = ({ show, link, updateSubMenu }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navLinkClassNames = useClassNames([
    'flex border-primary-black py-4 cursor-pointer relative',
    show ? 'border-b-[1.5px]' : '',
  ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <></>;

  return (
    <div onClick={updateSubMenu} className="h-52 py-12 px-10">
      <Link link={link?.path} title={link?.name} className={navLinkClassNames}>
        <Typography as="span" fontSize={16}>
          {link?.name}
        </Typography>
        {link?.subCategories.length > 0 && <ChevronDownIcon className="ml-10 w-16 text-secondary-black" />}
      </Link>
    </div>
  );
};
export default HeaderNavigationButtonDesktop;
