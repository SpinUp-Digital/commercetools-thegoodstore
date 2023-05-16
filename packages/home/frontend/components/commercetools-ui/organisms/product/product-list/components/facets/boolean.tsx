import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Checkbox from 'components/commercetools-ui/atoms/checkbox';
import { useProductList } from '../../context';
import { booleanFilterSelectedEventName } from '../../context/constants';
import { BooleanFilterSelected } from '../../context/types';
import { BooleanFacet } from '../../types';
import { FacetProps } from './types';

const BooleanFacet: React.FC<React.PropsWithChildren<FacetProps>> = ({ attribute }) => {
  const { facetsConfiguration, refine } = useProductList();

  const [globalSelected, setGlobalSelected] = useState('');

  const facet = useMemo(() => facetsConfiguration[attribute] as BooleanFacet, [facetsConfiguration, attribute]);

  const handleBooleanFilterSelected = useCallback(
    (e: CustomEvent<BooleanFilterSelected>) => {
      if (e.detail.attribute === attribute) setGlobalSelected(e.detail.key);
    },
    [attribute],
  );

  useEffect(() => {
    window.addEventListener(booleanFilterSelectedEventName, handleBooleanFilterSelected as EventListener);

    return () =>
      window.removeEventListener(booleanFilterSelectedEventName, handleBooleanFilterSelected as EventListener);
  }, [handleBooleanFilterSelected]);

  return (
    <div>
      <div className="flex flex-col gap-47 py-22 lg:min-w-[340px]">
        {facet.terms.map((term) => (
          <div key={term.key} className="flex items-center justify-between gap-8">
            <div>{term.label}</div>
            <div className="flex items-center gap-12">
              <Checkbox
                checked={!globalSelected ? term.selected : term.key === globalSelected}
                onChange={() => refine(attribute, term.key)}
                label={term.count ? term.count.toString() : ''}
                labelPosition="on-left"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooleanFacet;
