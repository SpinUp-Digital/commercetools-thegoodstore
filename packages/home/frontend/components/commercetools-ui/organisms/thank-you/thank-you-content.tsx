import React, { FC } from 'react';
import { Order } from 'shared/types/cart/Order';
import ThankYouOrderInfo from './components/order-info';
import OrderSummary from './components/order-summary';
import ThankYouFooter from './components/thank-you-footer';
import ThankYouHeader from './components/thank-you-header';

interface Props {
  order: Order;
}

const ThankYouContent: FC<Props> = ({ order }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-neutral-200 lg:gap-26 lg:p-50">
      <div className="items-start bg-white lg:flex lg:gap-24 lg:bg-neutral-200">
        <div className="bg-white px-16 md:px-24 lg:w-[65%] lg:rounded-md lg:py-36">
          <ThankYouHeader email={order.email} onPrint={handlePrint} />
          <ThankYouOrderInfo firstName={order.shippingAddress?.firstName} order={order} />
          <ThankYouFooter loading={!order.sum} />
        </div>

        <OrderSummary order={order} onPrint={handlePrint} />
      </div>
    </div>
  );
};

export default ThankYouContent;
