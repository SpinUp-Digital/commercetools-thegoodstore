import React from 'react';
import Checkout, { CheckoutWrappedProps } from 'components/commercetools-ui/organisms/checkout';

interface Props {
  data: CheckoutWrappedProps;
}

const CheckoutTastic = ({ data }: Props) => {
  return <Checkout {...data} />;
};

export default CheckoutTastic;
