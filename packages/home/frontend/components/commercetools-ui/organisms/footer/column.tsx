import React from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Reference } from 'types/reference';
import Link from '../../atoms/link';

export interface Link {
  name: string;
  reference: Reference;
}

export interface Props {
  header?: string;
  links: Link[];
  className?: string;
}

const Column: React.FC<Props> = ({ header, links, className }) => {
  return (
    <div className={className}>
      {header && (
        <Typography
          as="h3"
          fontFamily="inter"
          fontSize={14}
          medium
          className=" text-neutral-200 sm:self-center sm:pb-20 lg:self-start lg:text-16"
        >
          {header}
        </Typography>
      )}
      <ul role="list" className="flex flex-col gap-y-12 sm:self-center md:items-center lg:items-start lg:self-start">
        {links.map((item, i) => (
          <li key={i} className="lg:text-16">
            <Link variant="primary" link={item.reference}>
              <Typography as="fragment">{item.name}</Typography>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
