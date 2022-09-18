import React from 'react';
import TilesGroup, { Props as TilesGroupProps } from 'components/commercetools-ui/content/tiles-group';

export interface Props {
  data: TilesGroupProps;
}

const TilesGroupTastic: React.FC<Props> = ({ data }) => {
  return <TilesGroup {...data} />;
};

export default TilesGroupTastic;
