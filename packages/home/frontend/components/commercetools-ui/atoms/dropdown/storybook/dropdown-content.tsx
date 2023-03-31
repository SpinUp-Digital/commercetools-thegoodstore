import React from 'react';
import { dropdownItems } from 'helpers/mocks/mockAtomsData';
import Dropdown from '..';
import Typography from '../../typography';
import CustomDropdownMarket from './custom-dropdown-market';

const DropdownContent = () => {
  return (
    <div className="ml-44">
      <Typography fontSize={28} className="mt-40 w-[40%] font-bold text-black">
        Dropdown
      </Typography>
      <Typography fontSize={20} lineHeight="loose" className="mt-20 w-[60%] text-neutral-700">
        The Dropdown component allows customers to select one option from a list of options.
      </Typography>

      <div className="mt-40 w-[40%]">
        <Dropdown items={dropdownItems} />
      </div>

      <CustomDropdownMarket />
    </div>
  );
};

export default DropdownContent;
