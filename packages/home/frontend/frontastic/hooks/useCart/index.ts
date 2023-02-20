import { useCallback, useMemo } from 'react';
import { Discount } from '@commercetools/frontend-domain-types/cart/Discount';
import { Variant } from '@commercetools/frontend-domain-types/product/Variant';
import useSWR, { mutate } from 'swr';
import useI18n from 'helpers/hooks/useI18n';
import { SDK, sdk } from 'sdk';
import { Cart } from 'types/cart';
import { Order } from 'types/order';
import { revalidateOptions } from 'frontastic';
import { CartDetails, UseCartReturn } from './types';

const useCart = (): UseCartReturn => {
  const extensions = SDK.getExtensions();

  const { currency } = useI18n();

  const result = useSWR('/action/cart/getCart', extensions.cart.getCart, revalidateOptions);

  const shippingMethodsResults = useSWR(
    '/action/cart/getShippingMethods',
    extensions.cart.getShippingMethods,
    revalidateOptions,
  );

  const data = result.data?.isError ? {} : { data: result.data?.data as unknown as Cart };

  const shippingMethods = shippingMethodsResults.data?.isError ? {} : { data: shippingMethodsResults.data?.data };

  const totalItems = (data.data as Cart)?.lineItems?.reduce((acc, curr) => acc + (curr.count as number), 0) ?? 0;

  const isEmpty = !data?.data?.lineItems?.length;

  const isShippingAccurate = !!data?.data?.shippingInfo;

  const hasOutOfStockItems = !!data?.data?.lineItems?.some((lineItem) => !lineItem.variant?.isOnStock);

  const transaction = useMemo(() => {
    const cartData = data.data;

    if (!cartData?.lineItems?.length)
      return {
        subtotal: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
        discount: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
        tax: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
        shipping: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
        total: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
      };

    const currencyCode = cartData.sum?.currencyCode ?? currency;
    const fractionDigits = cartData.sum?.fractionDigits ?? 2;

    const totalAmount = cartData.sum?.centAmount as number;
    const subTotalAmount = cartData.lineItems.reduce(
      (acc, curr) => acc + (curr.price?.centAmount || 0) * (curr.count as number),
      0,
    );

    const discountedAmount = cartData.lineItems.reduce(
      (acc, curr) =>
        acc + ((curr.price?.centAmount || 0) * (curr.count as number) - (curr.totalPrice?.centAmount || 0)),
      0,
    );

    const totalTax =
      totalAmount > 0
        ? cartData.taxed?.taxPortions?.reduce((acc, curr) => acc + (curr.amount?.centAmount as number), 0) ?? 0
        : 0;

    const totalShipping =
      totalAmount > 0
        ? cartData.shippingInfo?.price?.centAmount ??
          cartData.availableShippingMethods?.[0]?.rates?.[0]?.price?.centAmount ??
          0
        : 0;

    return {
      subtotal: {
        centAmount: subTotalAmount,
        currencyCode,
        fractionDigits,
      },
      discount: {
        centAmount: discountedAmount,
        currencyCode,
        fractionDigits,
      },
      shipping: {
        centAmount: totalShipping,
        currencyCode,
        fractionDigits,
      },
      tax: {
        centAmount: totalTax,
        currencyCode,
        fractionDigits,
      },
      total: {
        centAmount: totalAmount + totalTax,
        currencyCode,
        fractionDigits,
      },
    };
  }, [data.data, currency]);

  const addItem = useCallback(async (variant: Variant, quantity: number) => {
    const extensions = SDK.getExtensions();

    const payload = {
      variant: {
        sku: variant.sku,
        count: quantity,
      },
    };

    const res = await extensions.cart.addItem(payload);
    mutate('/action/cart/getCart', res);
  }, []);

  const orderCart = useCallback(async () => {
    const res = await sdk.callAction({ actionName: 'cart/checkout' });
    mutate('/action/cart/getCart');

    return (res.isError ? {} : res.data) as Order;
  }, []);

  const getOrder = useCallback(async (orderId: Order['orderId']) => {
    const res = await sdk.callAction({ actionName: 'cart/getOrder', payload: { orderId: orderId } });
    mutate('/action/cart/getCart');

    return (res.isError ? {} : res.data) as Order;
  }, []);

  const orderHistory = useCallback(async () => {
    const extensions = SDK.getExtensions();

    const res = await extensions.cart.getOrderHistory();

    return res.isError ? ([] as Order[]) : (res.data as Order[]);
  }, []);

  const getProjectSettings = useCallback(async () => {
    const extensions = SDK.getExtensions();

    const res = await extensions.project.getSettings();

    return res.isError ? {} : res.data;
  }, []);

  const removeItem = useCallback(async (lineItemId: string) => {
    const extensions = SDK.getExtensions();

    const payload = {
      lineItem: { id: lineItemId },
    };

    const res = await extensions.cart.removeItem(payload);
    mutate('/action/cart/getCart', res);
  }, []);

  const updateItem = useCallback(async (lineItemId: string, newQuantity: number) => {
    const extensions = SDK.getExtensions();

    const payload = {
      lineItem: {
        id: lineItemId,
        count: newQuantity,
      },
    };
    const res = await extensions.cart.updateItem(payload);
    mutate('/action/cart/getCart', res);
  }, []);

  const updateCart = useCallback(async (payload: CartDetails): Promise<Cart> => {
    const extensions = SDK.getExtensions();

    const res = await extensions.cart.updateCart(payload);

    mutate('/action/cart/getCart', res);

    return (res.isError ? {} : res.data) as Cart;
  }, []);

  const setShippingMethod = useCallback(async (shippingMethodId: string) => {
    const extensions = SDK.getExtensions();

    const payload = {
      shippingMethod: {
        id: shippingMethodId,
      },
    };

    const res = await extensions.cart.setShippingMethod(payload);

    mutate('/action/cart/getCart', res);
  }, []);

  const redeemDiscountCode = useCallback(async (code: string) => {
    const extensions = SDK.getExtensions();

    const payload = {
      code: code,
    };
    const res = await extensions.cart.redeemDiscountCode(payload);

    if (!res.isError && (res.data as Cart).cartId) {
      mutate('/action/cart/getCart', res);
    } else {
      throw new Error('code not valid');
    }
  }, []);

  const removeDiscountCode = useCallback(async (discount: Discount) => {
    const extensions = SDK.getExtensions();

    const res = await extensions.cart.removeDiscountCode({ discountId: discount.discountId as string });

    mutate('/action/cart/getCart', res);
  }, []);

  return {
    ...data,
    totalItems,
    isEmpty,
    isShippingAccurate,
    hasOutOfStockItems,
    transaction,
    addItem,
    updateCart,
    setShippingMethod,
    removeItem,
    updateItem,
    shippingMethods,
    orderCart,
    getOrder,
    orderHistory,
    getProjectSettings,
    redeemDiscountCode,
    removeDiscountCode,
  };
};

export default useCart;
