import React, { FC } from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import useOrderFetch from '../helper-hooks/useOrderFetch';
import OrderInfoSection from './order-info';
import OrderStatusBar from './order-status-bar';
import OrderSummary from './order-summary/order-summary';

export interface Props {
  orderId?: string;
}

const OrderPage: FC<Props> = ({ orderId }) => {
  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });

  const { orders } = useOrderFetch();
  const order = orders?.find((order) => order.orderId === orderId);

  return (
    <>
      <div className="mt-16 pb-12 md:mt-0">
        <Typography
          as="h2"
          fontSize={18}
          fontFamily="libre"
          className="mt-20 pl-16 text-primary-black md:mt-0 md:pl-24 md:text-22 lg:pl-0 lg:text-24"
        >
          {formatOrdersMessage({
            id: 'order.details',
            defaultMessage: 'Order Details',
          })}
        </Typography>
      </div>
      <div className="flex pl-16 pt-8 pb-16 md:px-0 md:pl-24 md:pt-12 lg:pl-0 lg:pt-24">
        <Typography
          as="h3"
          fontSize={14}
          fontFamily="inter"
          className="whitespace-nowrap text-secondary-black md:text-16"
        >
          {formatOrdersMessage({
            id: 'order.number',
            defaultMessage: 'Order number:',
          })}
        </Typography>
        <Typography as="h3" medium fontSize={14} fontFamily="inter" className="pl-8 text-primary-black md:text-16">
          {order?.orderId?.replaceAll('-', ' ')}
        </Typography>
      </div>

      <div>
        <OrderStatusBar order={order} />
      </div>

      <div className="mt-96 flex lg:flex-col xl:flex-row">
        <OrderInfoSection order={order} />

        <OrderSummary order={order} />
      </div>
    </>
  );
};

export default OrderPage;
