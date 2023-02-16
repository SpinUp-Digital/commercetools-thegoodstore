import React, { ChangeEvent, useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import useClassNames from 'helpers/hooks/useClassNames';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop } from 'helpers/utils/screensizes';
import Typography from '../typography';

export interface Props extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  label?: string;
  labelPosition?: 'on-left' | 'on-right';
  containerClassName?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disableBackground?: boolean;
}

const Checkbox: React.FC<Props> = ({
  className = '',
  checked,
  onChange,
  onMouseOver,
  onMouseLeave,
  containerClassName,
  label,
  defaultChecked = false,
  labelPosition = 'on-right',
  disableBackground = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked ?? false);

  const [isDesktopSize] = useMediaQuery(desktop);

  useEffect(() => {
    if (typeof checked !== 'undefined') setIsChecked(checked);
  }, [checked]);

  const handleContainerClick = () => {
    if (!isDesktopSize) setIsChecked(!isChecked);
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsHovered(isDesktopSize);
    onMouseOver?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange?.(e);
  };

  const containerClassNames = useClassNames(['flex items-center gap-12', containerClassName]);
  const buttonClassName = useClassNames([
    'h-20 w-20 min-w-[20px] rounded-sm relative outline outline-1 cursor-pointer',
    isHovered ? 'outline-secondary-black' : 'outline-neutral-500',
  ]);

  const inputClassName = useClassNames([
    'absolute w-full h-full z-[2] checked:bg-none bg-transparent text-transparent border-transparent',
    className,
  ]);

  const iconClassName = useClassNames([
    'absolute top-[50%] z-[1] left-[50%] h-16 w-16 translate-y-[-50%] translate-x-[-50%] stroke-[1.5px]',
    isChecked || isHovered ? 'block' : 'hidden',
    isChecked && !disableBackground ? 'text-white' : 'text-secondary-black',
  ]);

  const backgroundClassName = useClassNames([
    'absolute z-0 h-20 w-20 rounded-sm',
    { 'bg-secondary-black': !!isChecked },
  ]);

  const LabelElement = (
    <Typography as="label" className="text-secondary-black" fontSize={14}>
      {label}
    </Typography>
  );

  return (
    <div className={containerClassNames} onClick={handleContainerClick}>
      {label && labelPosition === 'on-left' && LabelElement}

      <div className={buttonClassName}>
        <input
          type="checkbox"
          checked={isChecked}
          className={inputClassName}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onChange={handleChange}
          {...props}
        />

        <CheckIcon className={iconClassName} />

        {!disableBackground && <div className={backgroundClassName} />}
      </div>

      {label && labelPosition === 'on-right' && LabelElement}
    </div>
  );
};

export default Checkbox;
