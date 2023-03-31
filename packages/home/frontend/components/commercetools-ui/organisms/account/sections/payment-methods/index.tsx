import React from 'react';
import { useRouter } from 'next/router';
import Button from 'components/commercetools-ui/atoms/button';
import { Option } from 'components/commercetools-ui/atoms/select';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import PaymentCard from './payment-card';
export interface Payment {
  id: string;
  cardHolder: string;
  cardNumber: string;
  cardExpiryMonth: Option;
  cardExpiryYear: Option;
}
export const payments: Payment[] = [
  {
    id: '1',
    cardHolder: 'Ahmed Amir',
    cardNumber: '4646464646464644',
    cardExpiryMonth: { name: '03', value: '03' },
    cardExpiryYear: { name: '27', value: '27' },
  },
  {
    id: '2',
    cardHolder: 'Ahmed George',
    cardNumber: '4988438843884305',
    cardExpiryMonth: { name: '03', value: '03' },
    cardExpiryYear: { name: '25', value: '25' },
  },
  {
    id: '3',
    cardHolder: 'Dio Brando',
    cardNumber: '5555444433331111',
    cardExpiryMonth: { name: '03', value: '03' },
    cardExpiryYear: { name: '30', value: '30' },
  },
];

const PaymentMethods = () => {
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const router = useRouter();

  return (
    <div className="px-16 md:mt-24 md:px-24 lg:mt-40 lg:px-44">
      <div className="hidden md:block">
        <Typography as="h2" fontFamily="libre" fontSize={18} className="text-primary-black md:text-22 lg:text-24">
          {formatPaymentMessage({
            id: 'payment.methods',
            defaultMessage: 'Payment methods',
          })}
        </Typography>
      </div>
      <div className="mt-20 lg:mt-36">
        <Typography as="h2" fontSize={14} className="text-secondary-black md:text-16">
          {formatPaymentMessage({
            id: 'payment.details',
            defaultMessage: 'Delete or add payment methods.',
          })}
        </Typography>
      </div>
      <Button
        variant="primary"
        onClick={() => router.push('/account#add-payment')}
        className="mt-24 min-w-full md:min-w-[150px] lg:mt-36 lg:min-w-[200px]"
      >
        {formatPaymentMessage({
          id: 'add.card',
          defaultMessage: 'Add new card',
        })}
      </Button>
      <div className="mt-32 w-full lg:w-[90%]">
        {payments.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
