import React from 'react';
import Spacer, { Props as SpacerProps } from 'components/commercetools-ui/spacer';

export interface Props {
  data: SpacerProps;
}

const SpacerTastic: React.FC<Props> = ({ data }) => {
  return <Spacer {...data} />;
};

export default SpacerTastic;
