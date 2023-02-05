import React from 'react';
import Checkout, { Props as CheckoutProps } from 'components/commercetools-ui/organisms/checkout';

interface Props {
  data: CheckoutProps;
}

const CheckoutTastic = ({ data }: Props) => {
  return <Checkout {...data} />;
};

export default CheckoutTastic;
