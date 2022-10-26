import React from 'react';
import Typography from 'components/commercetools-ui/typography';
import { Reference } from 'types/reference';
import Link from '../link';

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
          fontWeight="semibold"
          className=" text-neutral-200 sm:self-center sm:pb-20 lg:self-start lg:text-16"
        >
          {header}
        </Typography>
      )}
      <ul
        role="list"
        className="flex flex-col gap-y-12 text-neutral-500 sm:self-center md:items-center lg:items-start lg:self-start"
      >
        {links.map((item, i) => (
          <li key={i} className="lg:text-16">
            <Link link={item.reference}>
              <Typography fontSize={14}>{item.name}</Typography>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
