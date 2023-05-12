import React, { FC, useCallback, useMemo } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Dropdown from 'components/commercetools-ui/atoms/dropdown';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { AccountTab } from '..';

export interface Props {
  contentTitle: string;
  hash: string | undefined;
  tabs: AccountTab[];
  className?: string;
}

const AccountTabsMobile: FC<React.PropsWithChildren<Props>> = ({ contentTitle, hash, tabs, className = '' }) => {
  const forms = ['#edit-personal-info', '#edit-newsletter', '#edit-address', '#change-password', '#delete-account'];
  const accountNavButtonClassNames = useClassNames([
    hash && forms.includes(hash) ? 'hidden' : 'relative md:hidden',
    className,
  ]);

  const accountNavMenuWrapperClassNames = useClassNames(['absolute top-40 left-0 z-30 w-full']);
  const accountTabsButtonClassNames = useCallback((open?: boolean) => {
    return `flex h-40 w-full items-center justify-between border ${
      open
        ? 'rounded-t-sm border-x-neutral-500 border-t-neutral-500 border-b-neutral-400'
        : 'rounded-sm border-neutral-500'
    } bg-white px-16 py-12 active:border-gray-500 focus:border-gray-500 focus:shadow-md`;
  }, []);
  const accountTabsMenuClassNames = useCallback((open?: boolean) => {
    return `max-h-300 overflow-scroll rounded-b-sm border ${
      open ? 'border-x-neutral-500 border-b-neutral-500' : 'border-neutral-400'
    } bg-white`;
  }, []);

  const accountTabButton = useMemo(() => {
    return (
      <>
        <Typography fontSize={14} medium className="text-secondary-black">
          {contentTitle}
        </Typography>
        <ChevronDownIcon strokeWidth={2} className="w-16 text-secondary-black" />
      </>
    );
  }, [contentTitle]);

  return (
    <div className={accountNavButtonClassNames}>
      <Dropdown
        customButtonElement={accountTabButton}
        customButtonClassNames={accountTabsButtonClassNames}
        customMenuWrapperClassNames={accountNavMenuWrapperClassNames}
        customMenuClassNames={accountTabsMenuClassNames}
      >
        {tabs.map((tab, index) => (
          <Menu.Item key={index}>
            <div className="overflow-y-scroll py-12 hover:bg-neutral-200 active:bg-neutral-200">
              <Link link={tab.href} className="flex w-full items-center justify-start px-16">
                <Typography fontSize={14} medium={tab.href === hash} className="text-secondary-black">
                  {tab.name}
                </Typography>
              </Link>
            </div>
          </Menu.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default AccountTabsMobile;
