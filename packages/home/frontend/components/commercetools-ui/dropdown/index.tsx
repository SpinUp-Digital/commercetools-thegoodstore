import React, { ChangeEvent, FC, useState } from 'react';

export type DropdownProps = {
  className?: string;
  items: Array<{ label: string; value: string }>;
  label?: string;
  onChange?: (selectedValue: string) => void;
  value?: string;
  defaultValue?: string;
};

const Dropdown: FC<DropdownProps> = ({ className, label, items, onChange, value, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <label className={`h-40 w-72 ${className}`}>
      {label}
      <select
        className="border-neutral-400 font-body text-14 font-regular leading-loose"
        value={value || selectedValue}
        onChange={handleChange}
      >
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
