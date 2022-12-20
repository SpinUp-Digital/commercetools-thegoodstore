import React from 'react';
import { RangeInput } from 'react-instantsearch-hooks-web';
import { FacetProps } from './types';

const RangeFacet: React.FC<FacetProps> = ({ attribute, label }) => {
  return (
    <div>
      <span>{label}</span>
      <RangeInput attribute={attribute} />
    </div>
  );
};

export default RangeFacet;
