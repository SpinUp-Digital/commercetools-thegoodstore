import React, { FC, Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';

export interface CustomDropdownProps {
  buttonElement?: JSX.Element;
  buttonClassNames?: (open?: boolean) => string | string;
  menuWrapperClassNames?: string;
  menuClassNames?: (open?: boolean) => string | string;
}

const CustomDropDown: FC<React.PropsWithChildren<CustomDropdownProps>> = ({
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
            enterFrom="transform origin-top scale-y-0"
            enterTo="transform origin-top scale-y-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform origin-top scale-y-150"
            leaveTo="transform origin-top scale-y-0"
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
