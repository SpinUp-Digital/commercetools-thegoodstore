import React from 'react';
import Spacer, { Props as SpacerProps } from 'components/commercetools-ui/organisms/spacer';

export interface Props {
  data: SpacerProps;
}

const SpacerTastic: React.FC<React.PropsWithChildren<Props>> = ({ data }) => {
  return <Spacer {...data} />;
};

export default SpacerTastic;
