import React from 'react';
import { XMarkIcon as CloseIcon } from '@heroicons/react/24/solid';
import { CurrentRefinementsConnectorParamsRefinement } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { useProductList } from '../../context';

interface Props {
  refinement: CurrentRefinementsConnectorParamsRefinement;
}

const Refinement: React.FC<Props> = ({ refinement }) => {
  const { removeRefinement } = useProductList();

  return (
    <div className="flex items-center justify-center gap-8 rounded-md border border-neutral-500 bg-white p-8">
      <span className="text-14 text-secondary-black">{refinement.label}</span>
      <CloseIcon
        className="w-20 cursor-pointer fill-secondary-black stroke-0"
        onClick={() => removeRefinement(refinement)}
      />
    </div>
  );
};

export default Refinement;
