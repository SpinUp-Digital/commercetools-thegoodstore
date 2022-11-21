import React from 'react';
import { Popover, Transition } from '@headlessui/react';
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
          <Transition
            enter="transition duration-50 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-50 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute -left-105 top-50 z-10 rounded-sm bg-white shadow-400">
              <div className="absolute left-1/2 -top-20 z-10 w-31 -translate-x-1/2 overflow-hidden">
                <div className="h-21 w-21 origin-bottom-left rotate-45 bg-white" />
              </div>
              <AccountDropdown />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default AccountButton;
