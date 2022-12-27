/* eslint-disable react-hooks/rules-of-hooks*/

import { Address } from '@commercetools/frontend-domain-types/account/Address';
import { Cart } from '@commercetools/frontend-domain-types/cart/Cart';
import { Discount } from '@commercetools/frontend-domain-types/cart/Discount';
import { Order } from '@commercetools/frontend-domain-types/cart/Order';
import { ShippingMethod } from '@commercetools/frontend-domain-types/cart/ShippingMethod';
import { Variant } from '@commercetools/frontend-domain-types/product/Variant';
import useSWR, { mutate } from 'swr';
import { SDK } from 'sdk';
import { revalidateOptions } from 'frontastic';

export type CartDetails = {
  account?: { email: string };
  shipping?: Address;
  billing?: Address;
};

export const cartItems = () => {
  const extensions = SDK.getExtensions();

  const result = useSWR('/action/cart/getCart', extensions.cart.getCart, revalidateOptions);

  if (result.data?.isError) return result as { data?: Cart };

  return { data: result.data?.data };
};

export const addItem = async (variant: Variant, quantity: number) => {
  const extensions = SDK.getExtensions();

  const payload = {
    variant: {
      sku: variant.sku,
      count: quantity,
    },
  };

  const res = await extensions.cart.addItem(payload);
  mutate('/action/cart/getCart', res);
};

export const orderCart = async () => {
  const extensions = SDK.getExtensions();

  const res = await extensions.cart.checkout();
  mutate('/action/cart/getCart', res);
};

export const orderHistory = async () => {
  const extensions = SDK.getExtensions();

  const res = await extensions.cart.getOrderHistory();

  return res.isError ? ([] as Order[]) : res.data;
};

export const getProjectSettings = async () => {
  const extensions = SDK.getExtensions();

  const res = await extensions.project.getSettings();

  return res.isError ? {} : res.data;
};

export const removeItem = async (lineItemId: string) => {
  const extensions = SDK.getExtensions();

  const payload = {
    lineItem: { id: lineItemId },
  };

  const res = await extensions.cart.removeItem(payload);
  mutate('/action/cart/getCart', res);
};

export const shippingMethods = () => {
  const extensions = SDK.getExtensions();

  const result = useSWR('/action/cart/getShippingMethods', extensions.cart.getShippingMethods, revalidateOptions);

  if (result.data?.isError) return result as { data?: ShippingMethod[] };

  return { data: result.data?.data };
};

export const updateItem = async (lineItemId: string, newQuantity: number) => {
  const extensions = SDK.getExtensions();

  const payload = {
    lineItem: {
      id: lineItemId,
      count: newQuantity,
    },
  };
  const res = await extensions.cart.updateItem(payload);
  mutate('/action/cart/getCart', res);
};

export const updateCart = async (payload: CartDetails): Promise<Cart> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.cart.updateCart(payload);

  mutate('/action/cart/getCart', res);

  return res.isError ? ({} as Cart) : res.data;
};

export const setShippingMethod = async (shippingMethodId: string) => {
  const extensions = SDK.getExtensions();

  const payload = {
    shippingMethod: {
      id: shippingMethodId,
    },
  };

  const res = await extensions.cart.setShippingMethod(payload);

  mutate('/action/cart/getCart', res);
};

export const redeemDiscountCode = async (code: string) => {
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
};

export const removeDiscountCode = async (discount: Discount) => {
  const extensions = SDK.getExtensions();

  const res = await extensions.cart.removeDiscountCode({ discountId: discount.discountId as string });

  mutate('/action/cart/getCart', res);
};
