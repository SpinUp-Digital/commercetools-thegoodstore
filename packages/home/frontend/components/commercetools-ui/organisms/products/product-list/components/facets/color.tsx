import React from 'react';
import { RefinementList } from 'react-instantsearch-hooks-web';
import { FacetProps } from './types';

const ColorFacet: React.FC<FacetProps> = ({ attribute, label }) => {
  return (
    <div>
      <span>{label}</span>
      <RefinementList attribute={attribute} />
    </div>
  );
};

export default ColorFacet;
