import React, { Dispatch, FC, useMemo } from 'react';
import { Category } from '@commercetools/domain-types/product/Category';
import { ChevronRightIcon, ArrowLongLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
      <div className="w-fill flex h-83 justify-between bg-neutral-300">
        {category.length > 0 && (
          <button
            onClick={() => setCategory((array) => array.slice(0, -1))}
            className="flex h-full w-full items-center justify-start"
          >
            <ArrowLongLeftIcon className="h-7.5 m-22 w-20 text-secondary-black" />
          </button>
        )}
        <button
          onClick={hideHeaderMenu}
          title={formatMessage({ id: 'close', defaultMessage: 'Close' })}
          className="flex h-full w-full items-center justify-end"
        >
          <XMarkIcon className="my-22 mx-25 w-20 text-secondary-black" />
        </button>
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
