import React from 'react';
import { dropdownItems } from 'helpers/mocks/mockAtomsData';
import Dropdown from '..';
import Typography from '../../typography';
import CustomDropdownMarket from './custom-dropdown-market';

const DropdownContent = () => {
  return (
    <div className="ml-44">
      <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
        Dropdown Component
      </Typography>
      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>

      <div className="mt-40 w-[40%]">
        <Dropdown items={dropdownItems} />
      </div>

      <CustomDropdownMarket />
    </div>
  );
};

export default DropdownContent;
