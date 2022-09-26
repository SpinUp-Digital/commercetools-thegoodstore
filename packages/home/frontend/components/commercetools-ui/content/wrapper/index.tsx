import React, { FC, ReactNode } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';

type WrapperProps = {
  children: ReactNode;
  background?: 'white' | 'neutral-200';
  hasPhonePadding?: boolean;
};

const Wrapper: FC<WrapperProps> = ({ children, background = 'white', hasPhonePadding }) => {
  const { resolveClassNames } = useClassNames();

  const className = resolveClassNames([hasPhonePadding && 'pl-8 md:pl-25 lg:pl-72 lg:pr-72 xl:pl-0 xl:pr-0']);

  return (
    <div className={`bg-${background}`}>
      <div className={`mx-auto max-w-[1248px] ${className}`}>{children}</div>
    </div>
  );
};

export default Wrapper;
