import React from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';

const PaymentMethods = () => {
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'orders' });
  return (
    <div>
      <div className="hidden pb-12 md:block">
        <Typography as="h2" fontFamily="libre" className="text-22 text-primary-black lg:text-24">
          {formatPaymentMessage({
            id: 'payment.methods',
            defaultMessage: 'Payment methods',
          })}
        </Typography>
      </div>
      Payment Methods
    </div>
  );
};

export default PaymentMethods;
