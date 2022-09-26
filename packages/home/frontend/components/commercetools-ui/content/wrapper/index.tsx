import React, { FC, ReactNode } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';

type WrapperProps = {
  children: ReactNode;
  background?: 'white' | 'neutral-200';
  phonePadding?: 'none' | 'left-padding-only' | 'full-padding';
  className?: string;
};

type phonePaddingClassNames = {
  [key in WrapperProps['phonePadding']]: string;
};

const Wrapper: FC<WrapperProps> = ({ children, background = 'white', phonePadding = 'none', className }) => {
  const phonePaddingClassNames: phonePaddingClassNames = {
    none: '',
    'left-padding-only': 'pl-8 md:pl-25 lg:pr-25 xl:pl-0 xl:pr-0',
    'full-padding': 'px-16 md:px-25',
  };

  return (
    <div className={`bg-${background}`}>
      <div className={`mx-auto max-w-[1248px] ${phonePaddingClassNames[phonePadding]} ${className ?? ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
