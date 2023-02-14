import React, { useMemo } from 'react';
import useResolveCCImage from 'components/commercetools-ui/organisms/checkout/hooks/useResolveCCImage';
import { useCheckout } from 'components/commercetools-ui/organisms/checkout/provider';
import { useFormat } from 'helpers/hooks/useFormat';
import Preview from '../wrapper';

const PaymentPreview = () => {
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });

  const { paymentData } = useCheckout();

  const resolveCCImage = useResolveCCImage();

  const PreviewComponent = useMemo(() => {
    if (paymentData.type === 'scheme') {
      return (
        <div className="flex items-center justify-between border border-neutral-400 p-16">
          <span className="text-14 font-medium capitalize">
            {formatCheckoutMessage({ id: 'creditCard', defaultMessage: 'Credit card' })}
          </span>
          <div className="flex items-center gap-4 md:gap-18">
            {/* eslint-disable-next-line */}
            <img className="w-[36px]" src={resolveCCImage(paymentData.number)} />
            <p className="text-14">
              ... {paymentData.number?.slice(-4)} {paymentData.expiryMonth}/{paymentData.expiryYear?.slice(2)}
            </p>
          </div>
        </div>
      );
    }

    if (paymentData.type === 'klarna_paynow') {
      return (
        <p className="text-14 text-secondary-black">
          {`${paymentData.shopperFirstName} ${paymentData.shopperLastName ?? ''}`}
          <span className="mt-8 block" />
          {paymentData.shopperEmail}
        </p>
      );
    }

    return <></>;
  }, [paymentData, resolveCCImage, formatCheckoutMessage]);

  return <Preview>{PreviewComponent}</Preview>;
};

export default PaymentPreview;
