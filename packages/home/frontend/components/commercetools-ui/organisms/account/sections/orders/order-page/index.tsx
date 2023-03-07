import React, { FC } from 'react';
import { LineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import { Address } from 'types/account';
import useOrderData from '../helper-hooks/useOrderData';
import useOrderFetch from '../helper-hooks/useOrderFetch';
import useOrderTransactions from '../helper-hooks/useOrderTransaction';
import OrderInfoSection from './order-info';
import OrderNumber from './order-number';
import OrderStatusBar from './order-status-bar';
import OrderSummary from './order-summary/order-summary';

export interface Props {
  orderId?: string;
}

const OrderPage: FC<Props> = ({ orderId }) => {
  const { orders } = useOrderFetch();
  const order = orders.find((order) => order.orderId === orderId);
  const { formattedOrderDate, formattedShippingDate, formattedDeliveryDate, shippingInfo, paymentInfo } =
    useOrderData(order);

  const { hiddenItemsCount, subtotal, shipmentFees, totalTax, total } = useOrderTransactions(order);

  return (
    <div className="md:mt-20 lg:mt-40">
      {order && (
        <>
          <OrderNumber orderNumber={order.orderId ?? ''} />

          <div className="mt-12">
            <OrderStatusBar
              orderDate={formattedOrderDate ?? ''}
              orderShippingDate={formattedShippingDate ?? ''}
              orderDeliveryDate={formattedDeliveryDate ?? ''}
              orderState={order.orderState ?? 'Registered'}
              orderShippingState={order.shipmentState ?? 'Pending'}
            />
          </div>

          <div className="mt-96 flex px-0 lg:flex-col lg:px-44 xl:flex-row">
            <OrderInfoSection
              order={order}
              shippingInfo={shippingInfo}
              paymentInfo={paymentInfo ?? ''}
              shippingAddress={order.shippingAddress as Address}
              orderState={order.orderState ?? 'Registered'}
            />

            <OrderSummary
              hiddenItemsCount={hiddenItemsCount}
              subtotal={subtotal}
              shipmentFees={shipmentFees}
              totalTax={totalTax}
              total={total}
              lineItems={order.lineItems as LineItem[]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
