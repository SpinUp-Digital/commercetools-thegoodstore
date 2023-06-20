import { FC } from 'react';
import { Order } from 'shared/types/cart/Order';
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

      {!order.lineItems && <OrderLineItem taxedPrice={{}} />}
    </div>
  );
};

export default OrderSummaryList;
