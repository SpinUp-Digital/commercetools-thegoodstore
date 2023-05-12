import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import useResolveCCImage from 'components/commercetools-ui/organisms/checkout/hooks/useResolveCCImage';
import { useFormat } from 'helpers/hooks/useFormat';
import { Payment } from '.';

interface Props {
  payment: Payment;
}

const PaymentCard: FC<React.PropsWithChildren<Props>> = ({ payment }) => {
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const router = useRouter();
  const resolveCCImage = useResolveCCImage();

  const goToEdit = (payment: Payment) => {
    router.push(`/account#edit-payment/${payment.id}`);
  };
  return (
    <div className="mt-16 flex items-center justify-between rounded-md border px-16 py-12 lg:p-24">
      <div className="flex items-center">
        {/* eslint-disable-next-line */}
        <img className="h-fit w-[32px]" src={resolveCCImage(payment.cardNumber)} />
        <Typography fontSize={14} className="ml-16 text-primary-black">
          {`...${payment.cardNumber.substring(12, 16)} ${payment.cardExpiryMonth.name}/${payment.cardExpiryYear.name}`}
        </Typography>
      </div>
      <Button variant="ghost" onClick={() => goToEdit(payment)} className="py-0 text-primary-black hover:underline">
        <Typography fontSize={14} className="hidden text-primary-black md:block">
          {formatPaymentMessage({
            id: 'edit',
            defaultMessage: 'Edit',
          })}
        </Typography>
      </Button>

      <Button variant="ghost" onClick={() => goToEdit(payment)} className="rounded-full bg-neutral-200 px-12 md:hidden">
        <PencilSquareIcon className="w-20" />
      </Button>
    </div>
  );
};

export default PaymentCard;
