import React, { useMemo } from 'react';
import { Popover } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import AccountDropdown from 'components/commercetools-ui/organisms/account/dropdown';
import { useFormat } from 'helpers/hooks/useFormat';
import { useAccount } from 'frontastic';

const AccountButton = () => {
  const { account, loggedIn } = useAccount();
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const userName = useMemo(() => {
    return `${account?.salutation ?? formatAccountMessage({ id: 'hello', defaultMessage: 'Hi, ' })} ${
      account?.firstName ?? formatAccountMessage({ id: 'user', defaultMessage: 'User' })
    }`;
  }, [account?.firstName, account?.salutation, formatAccountMessage]);

  return (
    <>
      <Link link={account ? '/account' : '/login'}>
        <UserIcon className="hidden w-24 text-secondary-black md:flex lg:hidden" />
      </Link>
      <Popover className="relative hidden lg:flex">
        {() => (
          <>
            <Popover.Button>
              <div className="flex w-fit whitespace-nowrap">
                <div className="mr-16 hidden w-104 py-2 lg:inline-block">
                  {loggedIn && (
                    <Typography fontSize={16} className="hidden truncate text-secondary-black lg:block">
                      {userName}
                    </Typography>
                  )}
                </div>
                <UserIcon className="w-28 text-secondary-black" />
              </div>
            </Popover.Button>
            <Popover.Overlay className="fixed inset-0 z-[310] bg-secondary-black opacity-30" />
            <Popover.Panel className="absolute left-15 top-50 z-[310] animate-[appearDropdown_0.15s_ease-in-out] rounded-sm bg-white shadow-400">
              <div className="absolute left-1/2 -top-20 z-10 w-31 -translate-x-1/2 overflow-hidden">
                <div className="h-21 w-21 origin-bottom-left rotate-45 bg-white" />
              </div>
              <AccountDropdown />
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
};

export default AccountButton;
