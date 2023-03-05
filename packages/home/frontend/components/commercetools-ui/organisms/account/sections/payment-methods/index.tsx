import React from 'react';
import { useRouter } from 'next/router';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import { Option } from 'components/commercetools-ui/atoms/select';
import Typography from 'components/commercetools-ui/atoms/typography';
import useResolveCCImage from 'components/commercetools-ui/organisms/checkout/hooks/useResolveCCImage';
import { useFormat } from 'helpers/hooks/useFormat';
export interface Payment {
  id: string;
  cardHolder: string;
  cardNumber: string;
  cardExpiry: Option;
  cardCVC?: string;
}
export const payments: Payment[] = [
  {
    id: '1',
    cardHolder: 'Ahmed Amir',
    cardNumber: '4646464646464644',
    cardExpiry: { name: '03/25', value: '03/25' },
    cardCVC: '420',
  },
  {
    id: '2',
    cardHolder: 'Ahmed George',
    cardNumber: '4988438843884305',
    cardExpiry: { name: '03/27', value: '03/27' },
    cardCVC: '522',
  },
  {
    id: '3',
    cardHolder: 'Dio Brando',
    cardNumber: '5555444433331111',
    cardExpiry: { name: '03/30', value: '03/30' },
    cardCVC: '555',
  },
];

const PaymentMethods = () => {
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'orders' });
  const router = useRouter();
  const resolveCCImage = useResolveCCImage();

  const goToEdit = (payment: Payment) => {
    router.push(`/account#edit-payment/${payment.id}`);
  };

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
        className="mt-24 w-full md:w-[150px] lg:mt-36 lg:w-[200px]"
      >
        {formatPaymentMessage({
          id: 'add.card',
          defaultMessage: 'Add new card',
        })}
      </Button>
      <div className="mt-32 w-full lg:w-[90%]">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="mt-16 flex items-center justify-between rounded-md border px-16 py-12 lg:p-24"
          >
            <div className="flex items-center">
              {/* eslint-disable-next-line */}
              <img className="h-fit w-[32px]" src={resolveCCImage(payment.cardNumber)} />
              <Typography fontSize={14} className="ml-16 text-primary-black">
                {`...${payment.cardNumber.substring(12, 16)} ${payment.cardExpiry.name}`}
              </Typography>
            </div>
            <Button
              variant="ghost"
              onClick={() => goToEdit(payment)}
              className="p-0 text-primary-black hover:underline"
            >
              <Typography fontSize={14} className="hidden text-primary-black md:block">
                {formatPaymentMessage({
                  id: 'edit',
                  defaultMessage: 'Edit',
                })}
              </Typography>
            </Button>

            <Button
              variant="ghost"
              onClick={() => goToEdit(payment)}
              className="rounded-full bg-neutral-200 p-12 md:hidden"
            >
              <PencilSquareIcon className="w-20" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
