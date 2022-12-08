import React from 'react';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Reference } from 'types/reference';

export interface FooterLink {
  name: string;
  reference: Reference;
}

export interface Props {
  header?: string;
  links: FooterLink[];
  className?: string;
}

const Column: React.FC<Props> = ({ header, links, className }) => {
  return (
    <div className={className}>
      {header && (
        <Typography
          as="h3"
          fontFamily="inter"
          fontSize={16}
          medium
          className=" text-neutral-200 sm:self-center sm:pb-20 lg:self-start"
        >
          {header}
        </Typography>
      )}
      <ul
        role="list"
        className="mb-3 flex flex-col gap-y-18 sm:self-center md:items-center lg:items-start lg:self-start"
      >
        {links.map((item, i) => (
          <li key={i}>
            <Link variant="primary" link={item.reference}>
              <Typography as="fragment" fontSize={16} fontFamily="inter">
                {item.name}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
