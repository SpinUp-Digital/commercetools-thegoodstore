import React, { useMemo } from 'react';

export interface Props extends React.ComponentProps<'button'> {
  colorScheme: 'white' | 'blue';
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({ children, className, colorScheme = 'white', ...props }) => {
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
      className={`${className} ${colorSchemes[colorScheme]} rounded-md py-8 px-24 text-12 font-medium leading-[16px] md:py-12 md:px-48 md:text-16`}
    >
      {children}
    </button>
  );
};

export default Button;
