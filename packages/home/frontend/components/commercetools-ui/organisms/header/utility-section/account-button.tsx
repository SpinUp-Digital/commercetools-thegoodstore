import React, { useMemo } from 'react';
import { Popover } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import Typography from 'components/commercetools-ui/atoms/typography';
import AccountDropdown from 'components/commercetools-ui/organisms/account/dropdown';
import { useFormat } from 'helpers/hooks/useFormat';
import { useAccount } from 'frontastic';

const AccountButton = () => {
  const { account, loggedIn } = useAccount();
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const userName = useMemo(() => {
    return `${account?.salutation ?? formatAccountMessage({ id: 'hello', defaultMessage: 'Hi, ' })} ${
      account?.firstName
    }`;
  }, [account?.firstName, formatAccountMessage]);

  return (
    <Popover className="relative mx-5 lg:mx-10">
      {() => (
        <>
          <Popover.Button>
            <div className="flex whitespace-nowrap">
              {loggedIn && (
                <Typography fontSize={16} className="hidden py-2 pr-16 text-secondary-black lg:flex">
                  {userName}
                </Typography>
              )}
              <UserIcon className="w-24 text-secondary-black" />
            </div>
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 z-[999] bg-secondary-black opacity-30" />
          <Popover.Panel className="absolute -left-105 top-50 z-[999] animate-[appearDropdown_0.15s_ease-in-out] rounded-sm bg-white shadow-400">
            <div className="absolute left-1/2 -top-20 z-10 w-31 -translate-x-1/2 overflow-hidden">
              <div className="h-21 w-21 origin-bottom-left rotate-45 bg-white" />
            </div>
            <AccountDropdown />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default AccountButton;
