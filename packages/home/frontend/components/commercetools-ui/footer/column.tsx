import React from 'react';
import Typography from 'components/commercetools-ui/typography';
import { Reference, ReferenceLink } from 'helpers/reference';

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
        <h3 className="font-body text-14 font-semibold text-neutral-200 sm:self-center sm:pb-20 lg:self-start lg:text-16">
          <Typography>{header}</Typography>
        </h3>
      )}
      <ul
        role="list"
        className="flex flex-col gap-y-12 text-neutral-500 sm:self-center md:items-center lg:items-start lg:self-start"
      >
        {links.map((item, i) => (
          <li key={i} className="text-14 font-regular lg:text-16">
            <ReferenceLink target={item.reference}>
              <Typography>{item.name}</Typography>
            </ReferenceLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
