import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { AccountTab } from '../details';

export interface Props {
  contentTitle: string;
  tabs: AccountTab[];
}

const AccountTabsMobile: FC<Props> = ({ contentTitle, tabs }) => {
  return (
    <Menu as="div" className="relative pt-8 pb-20 md:hidden">
      {({ open }) => (
        <>
          <Menu.Button className="flex h-40 w-full items-center justify-between rounded-sm border border-neutral-500 bg-white px-8">
            <Typography className="mb-1 text-14 text-secondary-black">{contentTitle}</Typography>
            <ChevronDownIcon className="w-20 text-secondary-black" />
          </Menu.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute top-60 left-0 z-30 mt-2 w-full">
              <div className="max-h-fit overflow-scroll border-[1px] border-neutral-400 bg-white pt-4 pb-12 shadow-lg">
                {tabs.map((tab, index) => (
                  <Menu.Item key={index}>
                    <div className="overflow-y-scroll py-8">
                      <Link link={tab.href} className="flex w-full items-center justify-start px-10">
                        <Typography medium className="mb-1 text-14 font-medium text-secondary-black">
                          {tab.name}
                        </Typography>
                      </Link>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default AccountTabsMobile;
