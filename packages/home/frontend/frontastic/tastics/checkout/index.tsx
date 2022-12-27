import React from 'react';
import AdyenCheckout, { Props as CheckoutProps } from 'components/commercetools-ui/organisms/adyen-checkout';

interface Props {
  data: CheckoutProps;
}

const CheckoutTastic = ({ data }: Props) => {
  return (
    <AdyenCheckout termsLink={data.termsLink} cancellationLink={data.cancellationLink} privacyLink={data.privacyLink} />
  );
};

export default CheckoutTastic;
