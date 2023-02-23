import { useMemo } from 'react';
import { ShippingMethod } from '@commercetools/frontend-domain-types/cart/ShippingMethod';
import { Order } from 'types/order';
import useOrderFetch from './useOrderFetch';

const useOrderData = (order?: Order) => {
  const { shippingMethods } = useOrderFetch();

  const orderDateCreated = useMemo(() => {
    return order?.createdAt && new Date(order?.createdAt);
  }, [order]);

  const orderDateShipping = useMemo(() => {
    return orderDateCreated && new Date(orderDateCreated?.setDate(orderDateCreated?.getDate() + 3));
  }, [orderDateCreated]);

  const orderDateDelivery = useMemo(() => {
    return orderDateCreated && new Date(orderDateCreated?.setDate(orderDateCreated?.getDate() + 3));
  }, [orderDateCreated]);

  const formattedOrderDate = useMemo(() => {
    return (
      orderDateCreated &&
      `${new Date(orderDateCreated).toDateString().split(' ')[0]}, ${
        new Date(orderDateCreated).toDateString().split(' ')[1]
      } ${new Date(orderDateCreated).toDateString().split(' ')[2]}`
    );
  }, [orderDateCreated]);

  const formattedShippingDate = useMemo(() => {
    return (
      orderDateShipping &&
      `${new Date(orderDateShipping).toDateString().split(' ')[0]}, ${
        new Date(orderDateShipping).toDateString().split(' ')[1]
      } ${new Date(orderDateShipping).toDateString().split(' ')[2]}`
    );
  }, [orderDateShipping]);

  const formattedDeliveryDate = useMemo(() => {
    return (
      orderDateDelivery &&
      `${new Date(orderDateDelivery).toDateString().split(' ')[0]}, ${
        new Date(orderDateDelivery).toDateString().split(' ')[1]
      } ${new Date(orderDateDelivery).toDateString().split(' ')[2]}`
    );
  }, [orderDateDelivery]);

  const shippingName = useMemo(() => {
    return shippingMethods.data?.find(
      (shippingMethod: ShippingMethod) => shippingMethod.shippingMethodId === order?.shippingInfo?.shippingMethodId,
    )?.name;
  }, [order, shippingMethods]);

  const shippingInfo = useMemo(() => {
    return `${orderDateDelivery && new Date(orderDateDelivery).toISOString().split('T')[0]} with ${shippingName}`;
  }, [orderDateDelivery, shippingName]);

  const paymentInfo = useMemo(() => {
    return order?.payments && `${order?.payments[0].paymentMethod} **${order?.payments[0].cardSummary}`;
  }, [order?.payments]);

  return {
    shippingInfo,
    paymentInfo,
    formattedOrderDate,
    formattedShippingDate,
    formattedDeliveryDate,
  };
};
export default useOrderData;
