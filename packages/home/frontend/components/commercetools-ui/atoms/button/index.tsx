import React, { useMemo } from 'react';

export interface Props extends React.ComponentProps<'button'> {
  colorScheme?: 'black' | 'white' | 'blue';
  rounded?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  colorScheme = 'white',
  rounded = 'md',
  ...props
}) => {
  const colorSchemes = useMemo(
    () => ({
      black: 'bg-gray-700 text-white',
      white: 'bg-white text-primary-black',
      blue: 'bg-blue-500 text-white',
    }),
    [],
  );

  return (
    <button
      {...props}
      className={`${
        colorSchemes[colorScheme]
      } rounded-${rounded} py-12 px-24 font-body text-14 font-medium leading-[16px] ${className ?? ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
