import React from 'react';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import Checkbox from 'components/commercetools-ui/atoms/checkbox';
import useRefinementHelpers from '../../hooks/useRefinementHelpers';
import { FacetProps } from './types';

const TermFacet: React.FC<React.PropsWithChildren<FacetProps>> = ({ attribute }) => {
  const { refine, items } = useRefinementList({ attribute });

  const { resolveLabel } = useRefinementHelpers();

  return (
    <div>
      <div className="flex flex-col gap-47 py-22 lg:min-w-[340px]">
        {items.map((term) => (
          <div key={term.value} className="flex items-center justify-between gap-8">
            <div>{resolveLabel(attribute, term.label)}</div>
            <div className="flex items-center gap-12">
              <Checkbox
                checked={term.isRefined}
                onChange={() => refine(term.value)}
                label={term.count.toString()}
                labelPosition="on-left"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermFacet;
