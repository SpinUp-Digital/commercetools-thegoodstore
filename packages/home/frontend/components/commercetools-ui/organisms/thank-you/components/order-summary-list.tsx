import { FC } from 'react';
import { Order } from 'types/order';
import OrderLineItem from './order-item';

type OrderSummaryListProps = {
  className?: string;
  order: Order;
};

const OrderSummaryList: FC<OrderSummaryListProps> = ({ className, order }) => {
  return (
    <div className={className}>
      {order.lineItems?.map((lineItem, index) => (
        <OrderLineItem key={index} {...lineItem} />
      ))}

      {!order.lineItems && <OrderLineItem />}
    </div>
  );
};

export default OrderSummaryList;
