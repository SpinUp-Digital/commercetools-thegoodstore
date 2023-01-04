import React, { ChangeEvent, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import useClassNames from 'helpers/hooks/useClassNames';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop } from 'helpers/utils/screensizes';

export interface Props extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  containerClassName?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<Props> = ({
  className = '',
  checked,
  onChange,
  onMouseOver,
  onMouseLeave,
  containerClassName,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(checked ?? false);

  const [isDesktopSize] = useMediaQuery(desktop);

  const handleContainerClick = () => {
    if (!isDesktopSize) setIsChecked(!isChecked);
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsHovered(true);
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

  const containerClassNames = useClassNames([
    'h-20 w-20 rounded-sm relative outline outline-1',
    isHovered ? 'outline-secondary-black' : 'outline-neutral-500',
    containerClassName,
  ]);

  const inputClassName = useClassNames([
    'absolute w-full h-full checked:bg-none bg-transparent text-transparent border-transparent',
    className,
  ]);

  const iconClassName = useClassNames([
    'absolute top-[50%] left-[50%] z-[-1] h-16 w-16 translate-y-[-50%] translate-x-[-50%] stroke-[1.5px]',
    isChecked || isHovered ? 'block' : 'hidden',
    isChecked ? 'text-white' : 'text-secondary-black',
  ]);

  const backgroundClassName = useClassNames([
    'absolute z-[-2] h-full w-full rounded-sm',
    { 'bg-secondary-black': !!isChecked },
  ]);

  return (
    <div className="flex items-center gap-8" onClick={handleContainerClick}>
      <div className={containerClassNames}>
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

        <div className={backgroundClassName} />
      </div>

      {children}
    </div>
  );
};

export default Checkbox;
