import React, { useMemo } from 'react';

export interface Props extends React.ComponentProps<'button'> {
  colorScheme?: 'white' | 'blue';
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
      white: 'bg-white text-primary-black',
      blue: 'bg-blue-500 text-white',
    }),
    [],
  );

  return (
    <button
      {...props}
      className={`${className} ${colorSchemes[colorScheme]} rounded-${rounded} py-8 px-24 text-12 font-medium leading-[16px] md:text-16 lg:py-12 lg:px-48`}
    >
      {children}
    </button>
  );
};

export default Button;
