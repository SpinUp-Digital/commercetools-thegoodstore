import React, { ChangeEvent, ComponentProps, FC, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useClassNames from 'helpers/hooks/useClassNames';

export interface DropdownProps extends ComponentProps<'select'> {
  className?: string;
  containerClassName?: string;
  items: Array<{ label: string; value: string }>;
  label?: string;
  value?: string;
  defaultValue?: string;
}

const Dropdown: FC<DropdownProps> = ({
  className = '',
  containerClassName = '',
  label,
  items,
  onChange,
  value,
  defaultValue,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange?.(e);
  };

  const selectClassName = useClassNames([
    'absolute font-body text-14 border-none focus:ring-0 rounded-sm w-full bg-transparent bg-none font-regular leading-loose pl-12 pr-0 py-0',
    className,
  ]);
  const labelClassName = useClassNames(['h-40', containerClassName]);

  return (
    <label className={labelClassName}>
      {label}
      <div className="relative h-40 w-64 overflow-hidden rounded-sm border border-neutral-400">
        <select className={selectClassName} value={value || selectedValue} onChange={handleChange} {...props}>
          {items.map(({ label, value }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>

        <ChevronDownIcon className="absolute right-5 top-[50%] z-[-1] h-20 w-30 translate-y-[-50%] stroke-1 text-secondary-black" />
      </div>
    </label>
  );
};

export default Dropdown;
