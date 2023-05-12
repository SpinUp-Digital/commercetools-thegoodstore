import React from 'react';
import Showcase, { Props as ShowcaseProps } from 'components/commercetools-ui/organisms/showcase';

interface Props {
  data: ShowcaseProps;
}

const ShowcaseTastic: React.FC<React.PropsWithChildren<Props>> = ({ data }) => {
  return <Showcase {...data} />;
};

export default ShowcaseTastic;
