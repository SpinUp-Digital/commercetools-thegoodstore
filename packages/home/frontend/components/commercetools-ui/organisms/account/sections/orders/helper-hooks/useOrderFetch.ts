import { useEffect, useState } from 'react';
import { Order } from 'types/order';
import { useCart } from 'frontastic';

const useOrderFetch = () => {
  const { orderHistory, shippingMethods } = useCart();
  const [orders, setAccountOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (orderHistory) {
      orderHistory().then((data) => {
        setAccountOrders(data);
      });
    } else {
      setAccountOrders([]);
    }
    setLoading(false);
  }, [orderHistory]);

  return {
    orders,
    shippingMethods,
    loading,
  };
};

export default useOrderFetch;
