import React, { Dispatch, FC } from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import { ChevronRightIcon, ArrowLongLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';

export interface Props {
  links: Category[];
  hideHeaderMenu: () => void;
  category: Category[];
  setCategory: Dispatch<React.SetStateAction<Category[]>>;
}

const MobileMenu: FC<Props> = ({ links, hideHeaderMenu, category, setCategory }) => {
  const { formatMessage } = useFormat({ name: 'common' });

  return (
    <>
      <div className="flex h-83 w-full justify-between bg-neutral-300">
        {category.length > 0 && (
          <div className="mx-10 flex h-full w-full items-center justify-start">
            <Button size="icon" variant="ghost" onClick={() => setCategory((array) => array.slice(0, -1))}>
              <ArrowLongLeftIcon className="w-20 text-secondary-black" />
            </Button>
          </div>
        )}
        <div className="mx-15 flex h-full w-full items-center justify-end">
          <Button
            size="icon"
            variant="ghost"
            onClick={hideHeaderMenu}
            title={formatMessage({ id: 'close', defaultMessage: 'Close' })}
          >
            <XMarkIcon className="w-20 text-secondary-black" />
          </Button>
        </div>
      </div>
      <>
        {category.length <= 0 ? (
          links.map((link) => (
            <div key={link.categoryId} className="cursor-pointer border-b-[1px] border-neutral-400">
              {link?.subCategories?.length > 0 ? (
                <div
                  onClick={() => setCategory((array) => [...array, link])}
                  className="mx-20 my-12 flex h-24 justify-between"
                >
                  <Typography as="p" fontSize={16} fontWeight="medium">
                    {link.name}
                  </Typography>
                  <ChevronRightIcon className="mt-2 mr-6 w-20 text-secondary-black" />
                </div>
              ) : (
                <Link
                  link={link.slug ?? link.path}
                  className="mx-20 my-12 flex h-24 justify-between text-16 font-medium"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))
        ) : (
          <>
            <div className="mx-20 my-18 flex h-24 justify-start">
              <Typography as="p" fontSize={16} fontWeight="medium">
                {category[category.length - 1].name}
              </Typography>
            </div>
            {category[category.length - 1].subCategories.map((nav) => (
              <div key={nav.categoryId} className="cursor-pointer border-b-[1px] border-neutral-400">
                {nav.subCategories.length > 0 ? (
                  <div
                    onClick={() => setCategory((array) => [...array, nav])}
                    className="mx-20 my-12 flex h-24 justify-between"
                  >
                    <Typography as="p" fontSize={16} fontWeight="regular">
                      {nav.name}
                    </Typography>
                    <ChevronRightIcon className="mt-2 mr-6 w-20" />
                  </div>
                ) : (
                  <Link
                    link={nav.slug ?? nav.path}
                    className="mx-20 my-12 flex h-24 justify-between text-16 font-normal"
                  >
                    {nav.name}
                  </Link>
                )}
              </div>
            ))}
          </>
        )}
      </>
    </>
  );
};

export default MobileMenu;
