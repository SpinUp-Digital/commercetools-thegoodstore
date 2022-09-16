import { Reference } from 'helpers/reference';
import React from 'react';
import Link from '../link';

export interface Props {
  title?: string;
  subtitle?: string;
  ctaText: string;
  ctaTarget: Reference;
}

const Section: React.FC<React.PropsWithChildren<Props>> = ({ children, title, subtitle, ctaText, ctaTarget }) => {
  return (
    <div>
      <div className="text-start">
        <h3 className="text-16 font-bold md:text-22 lg:text-28">{title}</h3>
        <div className="mt-8 flex items-center justify-between md:mt-16 lg:mt-14">
          <p className="text-12 font-thin leading-loose md:text-14 lg:text-16">{subtitle}</p>
          <div className="hidden lg:block">
            <Link target={ctaTarget} underlined>
              <span className="leading-loose">{ctaText}</span>
            </Link>
          </div>
        </div>
        <div className="mt-20 block md:mt-16 lg:hidden">
          <Link target={ctaTarget} withArrow>
            <span className="font-semibold leading-[24px] text-secondary-black">{ctaText}</span>
          </Link>
        </div>
      </div>
      <div className="mt-20 md:mt-24 lg:mt-20">{children}</div>
    </div>
  );
};

export default Section;
