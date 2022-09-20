import React, { FC, ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
  background?: 'white' | 'neutral';
  phonePadding?: boolean;
};

const Wrapper: FC<WrapperProps> = ({ children, background = 'white', phonePadding }) => {
  return (
    <div className={`bg-${background == 'white' ? 'white' : 'neutral-200'}`}>
      <div className={`mx-auto max-w-[1248px] ${phonePadding && 'pl-8 md:pl-25 lg:pl-0'}`}>{children}</div>
    </div>
  );
};

export default Wrapper;
