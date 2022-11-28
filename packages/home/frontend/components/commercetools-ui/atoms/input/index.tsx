import React, { ChangeEvent, ComponentProps, FC, useCallback, useMemo, useState } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';

export interface InputProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  label?: string;
  onChange?: (target: ChangeEvent<HTMLInputElement>) => void;
  variant?: 'primary' | 'secondary';
}

const Input: FC<InputProps> = ({
  label,
  onChange,
  value,
  onBlur,
  onFocus,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLocalValue(event.target.value);
      onChange?.(event);
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
    isInActiveState && label ? 'opacity-1 scale-100' : 'scale-0 opacity-0',
  ]);

  const inputClassName = useClassNames([
    'h-40 w-full rounded-sm border border-neutral-300 px-12 text-primary-black placeholder:text-14 placeholder:leading-normal placeholder:text-secondary-black focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-400',
    bgClassName,
    isInActiveState && label ? 'pt-[20px] pb-[4px]' : 'pt-[10px] pb-[10px]',
    className,
  ]);

  return (
    <div className="relative">
      {label && <span className={labelClassName}>{label}</span>}
      <input className={inputClassName} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} {...props} />
    </div>
  );
};

export default Input;
