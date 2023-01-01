import React, { useCallback, useMemo } from 'react';
import { XMarkIcon as CloseIcon } from '@heroicons/react/24/solid';
import { CurrentRefinementsConnectorParamsRefinement } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { useCurrentRefinements } from 'react-instantsearch-hooks';
import { useFormat } from 'helpers/hooks/useFormat';
import { useProductList } from '../../context';

const CurrentRefinements = () => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const { removeRefinement, removeAllRefinements } = useProductList();

  const { items } = useCurrentRefinements();

  const refinementsApplied = useMemo(() => items.length, [items]);

  const getRefinementLabel = useCallback((refinement: CurrentRefinementsConnectorParamsRefinement) => {
    if (refinement.type === 'numeric') return `${refinement.operator} ${(refinement.value as number) / 100}`;
    return refinement.label;
  }, []);

  if (!refinementsApplied) return <></>;

  return (
    <div className="flex flex-wrap items-center justify-start gap-14 pt-16">
      {items
        .map((item) => {
          return item.refinements.map((refinement) => (
            <div
              key={refinement.label}
              className="flex items-center justify-center gap-8 rounded-md border border-neutral-500 bg-white p-8"
            >
              <span className="text-14 text-secondary-black">{getRefinementLabel(refinement)}</span>
              <CloseIcon
                className="w-20 cursor-pointer fill-secondary-black stroke-0"
                onClick={() => removeRefinement(refinement)}
              />
            </div>
          ));
        })
        .flat()}
      <div className="flex items-center justify-center gap-8 rounded-md border-neutral-500 bg-white p-8">
        <span className="text-14 text-secondary-black">
          {formatProductMessage({ id: 'clear.all', defaultMessage: 'Clear All' })}
        </span>
        <CloseIcon className="w-20 cursor-pointer fill-secondary-black stroke-0" onClick={removeAllRefinements} />
      </div>
    </div>
  );
};

export default CurrentRefinements;
