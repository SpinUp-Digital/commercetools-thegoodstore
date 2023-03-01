import React, { FC, Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';

export interface CustomDropdownProps {
  buttonElement?: JSX.Element;
  buttonClassNames?: (open?: boolean) => string | string;
  menuWrapperClassNames?: string;
  menuClassNames?: (open?: boolean) => string | string;
}

const CustomDropDown: FC<CustomDropdownProps> = ({
  buttonElement,
  buttonClassNames,
  menuWrapperClassNames,
  menuClassNames,
  children,
}) => {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button as="div" className={buttonClassNames ? buttonClassNames(open) : ''}>
            {buttonElement}
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
            <Menu.Items className={menuWrapperClassNames}>
              <div className={menuClassNames ? menuClassNames(open) : ''}>{children}</div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default CustomDropDown;
