import React from 'react';
import Newsletter, { NewsletterProps } from 'components/commercetools-ui/organisms/newsletter';

interface Props {
  data: NewsletterProps;
}

const NewsletterTastic: React.FC<React.PropsWithChildren<Props>> = ({ data }) => {
  return <Newsletter {...data} />;
};

export default NewsletterTastic;
