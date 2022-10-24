import useClassNames from 'helpers/hooks/useClassNames';
import React, { useCallback, useMemo, useState } from 'react';

export interface Props extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  label?: string;
  onChange?: (value: string) => void;
  variant?: 'primary' | 'secondary';
}

const Input: React.FC<Props> = ({
  label,
  onChange,
  value,
  onBlur,
  onFocus,
  style = {},
  variant = 'primary',
  className = '',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange],
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const bgClassName = useMemo(
    () =>
      ({
        primary: 'bg-white',
        secondary: 'bg-neutral-200',
      }[variant]),
    [variant],
  );

  const isInActiveState = useMemo(() => isFocused || !!localValue, [isFocused, localValue]);

  const labelClassName = useClassNames([
    'absolute top-[6px] left-[12px] block text-10 font-semibold transition duration-150 ease-out',
    isInActiveState ? 'opacity-1 scale-100' : 'scale-0 opacity-0',
  ]);

  const inputClassName = useClassNames([
    'w-full rounded-l-sm border border-neutral-300 px-12 text-primary-black placeholder:text-14 placeholder:leading-normal placeholder:text-primary-black focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-400',
    className,
    bgClassName,
    isInActiveState ? 'pt-[20px]' : 'pt-[12px]',
    isInActiveState ? 'pb-[4px]' : 'pb-[12px]',
  ]);

  return (
    <div className="relative">
      <span className={labelClassName}>{label}</span>
      <input className={inputClassName} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} {...props} />
    </div>
  );
};

export default Input;
