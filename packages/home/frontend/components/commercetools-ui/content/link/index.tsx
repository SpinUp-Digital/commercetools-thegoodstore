import useClassNames from 'helpers/hooks/useClassNames';
import { Reference, ReferenceLink } from 'helpers/reference';
import React from 'react';

export interface Props {
  target: Reference;
  underlined?: boolean;
  withArrow?: boolean;
  className?: string;
}

const Link: React.FC<React.PropsWithChildren<Props>> = ({ children, target, underlined, withArrow, className }) => {
  const { resolveClassNames } = useClassNames();

  const classNames = resolveClassNames([underlined && 'underline', className]);

  return (
    <ReferenceLink
      target={target}
      className={`flex w-fit items-center gap-12 text-12 font-regular underline-offset-4 md:text-16 ${classNames}`}
    >
      <span>{children}</span>
      {withArrow && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-[24px] stroke-secondary-black"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      )}
    </ReferenceLink>
  );
};

export default Link;
