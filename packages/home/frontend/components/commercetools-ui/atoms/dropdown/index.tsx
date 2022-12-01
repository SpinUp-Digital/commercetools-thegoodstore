import React, { ChangeEvent, FC, useState } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';

export type DropdownProps = {
  className?: string;
  containerClassName?: string;
  items: Array<{ label: string; value: string }>;
  label?: string;
  onChange?: (selectedValue: string) => void;
  value?: string;
  defaultValue?: string;
};

const Dropdown: FC<DropdownProps> = ({
  className,
  containerClassName,
  label,
  items,
  onChange,
  value,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange?.(value);
  };

  const selectClassName = useClassNames(['border-neutral-400 font-body text-14 font-regular leading-loose', className]);
  const labelClassName = useClassNames(['h-40 w-72', containerClassName]);

  return (
    <label className={labelClassName}>
      {label}
      <select className={selectClassName} value={value || selectedValue} onChange={handleChange}>
        {items.map(({ label, value }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
