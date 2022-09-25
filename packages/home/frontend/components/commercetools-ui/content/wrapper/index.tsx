import React, { FC, ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
  background?: 'white' | 'neutral-200';
  hasPhonePadding?: boolean;
};

const Wrapper: FC<WrapperProps> = ({ children, background = 'white', hasPhonePadding }) => {
  return (
    <div className={`bg-${background}`}>
      <div className={`mx-auto max-w-[1248px] ${hasPhonePadding && 'pl-8 md:pl-25 lg:pr-25 xl:pl-0 xl:pr-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
