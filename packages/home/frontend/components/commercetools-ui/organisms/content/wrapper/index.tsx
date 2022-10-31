import React, { FC, ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
  background?: 'white' | 'neutral-200';
  phonePadding?: 'none' | 'left-padding-only' | 'full-padding';
  className?: string;
  clearDefaultStyles?: boolean;
};

type phonePaddingClassNames = {
  [key in WrapperProps['phonePadding']]: string;
};

const Wrapper: FC<WrapperProps> = ({
  children,
  background = 'white',
  phonePadding = 'none',
  className,
  clearDefaultStyles,
}) => {
  const phonePaddingClassNames: phonePaddingClassNames = {
    none: '',
    'left-padding-only': 'pl-8 md:pl-25 lg:pr-25 xl:pl-0 xl:pr-0',
    'full-padding': 'px-16 md:px-25',
  };

  const wrapperClassName = clearDefaultStyles
    ? className
    : `mx-auto max-w-[1248px] ${phonePaddingClassNames[phonePadding]} ${className ?? ''}`;

  return (
    <div className={`bg-${background}`}>
      <div className={wrapperClassName}>{children}</div>
    </div>
  );
};

export default Wrapper;
