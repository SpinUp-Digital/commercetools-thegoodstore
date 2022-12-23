import React from 'react';
import { Menu } from '@headlessui/react';
import { useSortBy, UseSortByProps } from 'react-instantsearch-hooks';

const SortFacet: React.FC<UseSortByProps> = (props) => {
  const { currentRefinement, options, refine } = useSortBy(props);

  return (
    <div>
      {options.map(({ label, value }) => (
        <div
          key={value}
          onClick={() => refine(value)}
          className={`cursor-pointer p-14 transition hover:bg-neutral-200 ${
            value === currentRefinement ? 'bg-neutral-200' : 'bg-white'
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default SortFacet;
