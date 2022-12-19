import React, { ChangeEvent, ComponentProps, FC, useState } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';

export interface DropdownProps extends ComponentProps<'select'> {
  className?: string;
  containerClassName?: string;
  items: Array<{ label: string; value: string }>;
  label?: string;
  onChange?: (event: React.FormEvent) => void;
  value?: string;
  defaultValue?: string;
}

const Dropdown: FC<DropdownProps> = ({
  className,
  containerClassName,
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

  const selectClassName = useClassNames(['border-neutral-400 font-body text-14 font-regular leading-loose', className]);
  const labelClassName = useClassNames(['h-40', containerClassName]);

  return (
    <label className={labelClassName}>
      {label}
      <select className={selectClassName} value={value || selectedValue} onChange={handleChange} {...props}>
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
