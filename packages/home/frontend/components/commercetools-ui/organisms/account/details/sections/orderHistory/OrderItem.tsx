import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Money } from '@commercetools/frontend-domain-types/product/Money';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
export interface OrderItem {
  id: string;
  date: string;
  total: Money;
  status: string;
}

interface Props {
  order: OrderItem;
}

const OrderItem: FC<Props> = ({ order }) => {
  const router = useRouter();
  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });
  const handleReturnClick = () => {
    toast.success(formatOrdersMessage({ id: 'return.success', defaultMessage: 'Return created' }));
  };

  return (
    <div className="mb-24 w-full rounded-md border-[1.5px] border-neutral-300">
      <div className="grid grid-cols-1 items-center rounded-t-md bg-neutral-150 p-12 md:grid-cols-3 md:p-16 lg:grid-cols-4 lg:py-32 lg:px-24">
        <div className="flex-col">
          <div className="flex pb-16">
            <Typography fontSize={14} medium className="text-primary-black lg:text-16">
              {formatOrdersMessage({ id: 'order.id', defaultMessage: 'Order ID: ' })}
            </Typography>
            <Typography fontSize={14} className="pl-5 text-primary-black lg:text-16">
              {order.id}
            </Typography>
          </div>

          <div className="flex">
            <Typography fontSize={14} medium className="text-primary-black md:hidden">
              {formatOrdersMessage({ id: 'order.date', defaultMessage: 'Date:' })}
            </Typography>
            <Typography fontSize={14} className="pl-5 text-primary-black md:pl-0 md:text-secondary-black lg:text-16">
              {order.date}
            </Typography>
          </div>
        </div>

        <div className="ml-48 hidden md:flex md:flex-col">
          <Typography fontSize={16} medium className="pb-15 text-primary-black">
            {formatOrdersMessage({ id: 'total', defaultMessage: 'Total' })}
          </Typography>
          <Typography fontSize={14} className="text-secondary-black">
            {CurrencyHelpers.formatForCurrency(order.total as number, router.locale)}
          </Typography>
        </div>

        <div className="hidden md:flex md:flex-col">
          <Typography fontSize={16} medium className="pb-15 text-primary-black">
            {formatOrdersMessage({ id: 'status', defaultMessage: 'Status' })}
          </Typography>
          <Typography fontSize={14} className="text-secondary-black">
            {formatOrdersMessage({ id: order.status, defaultMessage: 'All orders' })}
          </Typography>
        </div>
        <div className="hidden justify-end lg:flex">
          <Button variant="primary" size="s" onClick={handleReturnClick} className="rounded-md py-8 px-16">
            <Typography fontSize={14} medium>
              {formatOrdersMessage({ id: 'create.return', defaultMessage: 'Create return' })}
            </Typography>
          </Button>
        </div>
      </div>
      <div className="flex w-full cursor-pointer items-center justify-between px-12 py-16 md:px-16 lg:py-20 lg:px-24">
        <div className="flex">
          <Typography fontSize={14} className="text-primary-black">
            4
          </Typography>
          <Typography fontSize={14} className="pl-7 text-primary-black">
            {formatOrdersMessage({ id: 'articles', defaultMessage: 'articles' })}
          </Typography>
        </div>

        <ChevronRightIcon strokeWidth={1.5} className="w-24 text-secondary-black" />
      </div>
    </div>
  );
};

export default OrderItem;
