import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Order } from 'shared/types/cart/Order';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import mapCosts from 'helpers/utils/mapCosts';

interface Props {
  order?: Order;
}

const OrderItem: FC<Props> = ({ order }) => {
  const { currency } = useI18n();
  const { locale } = useRouter();

  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });
  const { total: getTotal } = mapCosts({ order, currency });

  const handleReturnClick = () => {
    toast.success(formatOrdersMessage({ id: 'return.success', defaultMessage: 'Return created' }));
  };

  const orderDate = order?.createdAt && new Date(order?.createdAt).toISOString().split('T')[0];

  return (
    <div className="mb-24 w-full rounded-md border-[1.5px] border-neutral-300">
      <div className="grid grid-cols-1 items-center rounded-t-md bg-neutral-150 p-12 md:grid-cols-3 md:p-16 lg:grid-cols-4 lg:px-24 lg:py-32">
        <div className="flex-col">
          <div className="flex whitespace-nowrap pb-16">
            <Typography fontSize={14} medium className="text-primary-black lg:text-16">
              {formatOrdersMessage({ id: 'order.id', defaultMessage: 'Order ID: ' })}
            </Typography>
            <Typography fontSize={14} className="pl-5 text-primary-black lg:text-16">
              {order?.orderId?.replaceAll('-', ' ')}
            </Typography>
          </div>

          <div className="flex">
            <Typography fontSize={14} medium className="text-primary-black md:hidden">
              {formatOrdersMessage({ id: 'order.date', defaultMessage: 'Date:' })}
            </Typography>
            <Typography fontSize={14} className="pl-5 text-primary-black md:pl-0 md:text-secondary-black">
              {orderDate}
            </Typography>
          </div>
        </div>

        <div className="ml-48 hidden md:flex md:flex-col">
          <Typography fontSize={16} medium className="pb-15 text-primary-black">
            {formatOrdersMessage({ id: 'total', defaultMessage: 'Total' })}
          </Typography>
          <Typography fontSize={14} className="text-secondary-black">
            {CurrencyHelpers.formatForCurrency(getTotal, locale)}
          </Typography>
        </div>

        <div className="hidden md:flex md:flex-col">
          <Typography fontSize={16} medium className="pb-15 text-primary-black">
            {formatOrdersMessage({ id: 'status', defaultMessage: 'Status' })}
          </Typography>
          <Typography fontSize={14} className="text-secondary-black">
            {formatOrdersMessage({ id: order?.orderState as string, defaultMessage: order?.orderState })}
          </Typography>
        </div>
        <div className="hidden justify-end lg:flex">
          <Button variant="primary" size="s" onClick={handleReturnClick} className="rounded-md px-16 py-8">
            <Typography fontSize={14} medium>
              {formatOrdersMessage({ id: 'create.return', defaultMessage: 'Create return' })}
            </Typography>
          </Button>
        </div>
      </div>
      <Link link={`/account#orders/order_${order?.orderId}`}>
        <div className="flex w-full cursor-pointer items-center justify-between px-12 py-16 md:px-16 lg:px-24 lg:py-20">
          <div className="flex">
            <Typography fontSize={14} className="text-primary-black">
              {order?.lineItems?.length.toString()}
            </Typography>
            <Typography fontSize={14} className="pl-7 text-primary-black">
              {formatOrdersMessage({ id: 'articles', defaultMessage: 'articles' })}
            </Typography>
          </div>

          <ChevronRightIcon strokeWidth={1.5} className="w-24 text-secondary-black" />
        </div>
      </Link>
    </div>
  );
};

export default OrderItem;
