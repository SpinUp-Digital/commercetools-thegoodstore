import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Order } from 'shared/types/cart/Order';
import { useCart } from 'frontastic';
import ThankYouContent from './thank-you-content';

const ThankYou = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<Order>(Object);
  const { getOrder } = useCart();

  useEffect(() => {
    getOrder(orderId as string).then((res) => setOrder(res));
  }, [getOrder, orderId]);

  return <ThankYouContent order={order} />;
};

export default ThankYou;
