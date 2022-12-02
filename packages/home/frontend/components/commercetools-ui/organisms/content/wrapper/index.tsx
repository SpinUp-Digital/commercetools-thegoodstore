import React, { FC, ReactNode } from 'react';
import useTouchDevice from 'helpers/hooks/useTouchDevice';

type WrapperProps = {
  children: ReactNode;
  background?: 'white' | 'neutral-200';
  variant?: 'none' | 'left-padding-only' | 'full-padding-small' | 'full-padding';
  className?: string;
  clearDefaultStyles?: boolean;
};

type variantClassNames = {
  [key in WrapperProps['variant']]: string;
};

const Wrapper: FC<WrapperProps> = ({
  children,
  background = 'white',
  variant = 'none',
  className,
  clearDefaultStyles,
}) => {
  const { isTouchDevice } = useTouchDevice();

  const variantClassNames: variantClassNames = {
    none: '',
    'left-padding-only': !isTouchDevice
      ? 'pl-8 md:pr-96 md:pl-96 xl:pl-0 xl:pr-0'
      : 'pl-8 lg:pr-96 lg:pl-96 xl:pl-0 xl:pr-0',
    'full-padding-small': 'px-8 md:px-12',
    'full-padding': 'px-16 md:px-96',
  };

  const wrapperClassName = clearDefaultStyles
    ? className
    : `mx-auto max-w-[1150px] 2xl:max-w-[1248px] ${variantClassNames[variant]} ${className ?? ''}`;

  return (
    <div className={`bg-${background}`}>
      <div className={wrapperClassName}>{children}</div>
    </div>
  );
};

export default Wrapper;
