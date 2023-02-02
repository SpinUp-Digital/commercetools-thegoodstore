import React from 'react';
import CheckoutAdyen, { CheckoutAdyenProps } from 'components/commercetools-ui/organisms/checkout-adyen';

interface Props {
  data: CheckoutAdyenProps;
}

const CheckoutTastic = ({ data }: Props) => {
  return (
    <CheckoutAdyen termsLink={data.termsLink} cancellationLink={data.cancellationLink} privacyLink={data.privacyLink} />
  );
};

export default CheckoutTastic;
