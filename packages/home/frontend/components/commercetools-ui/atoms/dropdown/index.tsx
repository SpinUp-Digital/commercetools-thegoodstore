import React, { ComponentProps, FC } from 'react';
import CustomDropDown from './custom-dropdown';
import DefaultDropdown from './default-dropdown';

export interface DropdownProps extends ComponentProps<'select'> {
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  items?: Array<{ label: string; value: string }>;
  label?: string;
  value?: string;
  defaultValue?: string;
  customButtonElement?: JSX.Element;
  customButtonClassNames?: (open?: boolean) => string | string;
  customMenuClassNames?: (open?: boolean) => string;
  customMenuWrapperClassNames?: string;
}

const Dropdown: FC<React.PropsWithChildren<DropdownProps>> = ({
  className = '',
  containerClassName = '',
  labelClassName,
  label,
  items,
  onChange,
  value,
  customButtonElement,
  customButtonClassNames,
  customMenuClassNames,
  customMenuWrapperClassNames,
  children,
  ...props
}) => {
  return (
    <>
      {customButtonElement ? (
        <CustomDropDown
          buttonElement={customButtonElement}
          buttonClassNames={customButtonClassNames}
          menuClassNames={customMenuClassNames}
          menuWrapperClassNames={customMenuWrapperClassNames}
        >
          {children}
        </CustomDropDown>
      ) : (
        <DefaultDropdown
          className={className}
          containerClassName={containerClassName}
          labelClassName={labelClassName}
          label={label}
          items={items ?? []}
          onChange={onChange}
          value={value}
          {...props}
        />
      )}
    </>
  );
};

export default Dropdown;
