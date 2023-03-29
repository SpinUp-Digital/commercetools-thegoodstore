import React, { FC } from 'react';
import { Popover } from '@headlessui/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import AccountDropdown from '..';

const AccountDropdownContent: FC = () => {
  return (
    <div className="ml-44">
      <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
        Account Dropdown
      </Typography>
      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>
      <div className="mt-44 flex w-[50%] justify-start gap-x-50">
        <div>
          <Popover className="relative shadow-300">
            <div className="z-[310] rounded-sm bg-white shadow-400">
              <AccountDropdown loggedIn />
            </div>
          </Popover>
        </div>
        <div>
          <Popover className="relative shadow-300">
            <div className="z-[310] rounded-sm bg-white shadow-400">
              <AccountDropdown loggedIn={false} />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdownContent;
