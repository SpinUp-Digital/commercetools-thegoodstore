import React from 'react';
import { Popover } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import AccountDropdown from 'components/commercetools-ui/organisms/account/dropdown';

const AccountButton = () => {
  return (
    <Popover className="relative mx-5 lg:mx-10">
      {() => (
        <>
          <Popover.Button>
            <UserIcon className="w-24 text-secondary-black" />
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 z-10 bg-secondary-black opacity-30" />
          <Popover.Panel className="absolute -left-105 top-50 z-10 animate-[appearDropdown_0.15s_ease-in-out] rounded-sm bg-white shadow-400">
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
