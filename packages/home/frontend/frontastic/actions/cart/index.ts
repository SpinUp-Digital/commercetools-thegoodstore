import useSWR, { mutate } from 'swr';
import { Address } from '@commercetools/domain-types/account/Address';
import { Cart } from '@commercetools/domain-types/cart/Cart';
import { Discount } from '@commercetools/domain-types/cart/Discount';
import { Variant } from '@commercetools/domain-types/product/Variant';
import { revalidateOptions } from 'frontastic';
import { SDK } from 'sdk';

export type CartDetails = {
  account?: { email: string };
  shipping?: Address;
  billing?: Address;
};

export const cartItems = () => {
  const extensions = SDK.getExtensions();

  return useSWR('/action/cart/getCart', extensions.getCart, revalidateOptions);
};

export const addItem = async (variant: Variant, quantity: number) => {
  const extensions = SDK.getExtensions();

  const payload = {
    variant: {
      sku: variant.sku,
      count: quantity,
    },
  };

  const res = await extensions.addCartItem(payload);
  mutate('/action/cart/getCart', res);
};

export const orderCart = async () => {
  const extensions = SDK.getExtensions();

  const res = await extensions.checkoutCart();
  mutate('/action/cart/getCart', res);
};

export const orderHistory = async () => {
  const extensions = SDK.getExtensions();

  return await extensions.getOrderHistory();
};

export const getProjectSettings = async () => {
  const extensions = SDK.getExtensions();

  return await extensions.getProjectSettings();
};

export const removeItem = async (lineItemId: string) => {
  const extensions = SDK.getExtensions();

  const payload = {
    lineItem: { id: lineItemId },
  };

  const res = await extensions.removeCartItem(payload);
  mutate('/action/cart/getCart', res);
};

export const shippingMethods = () => {
  const extensions = SDK.getExtensions();

  return useSWR('/action/cart/getShippingMethods', extensions.getShippingMethods, revalidateOptions);
};

export const updateItem = async (lineItemId: string, newQuantity: number) => {
  const extensions = SDK.getExtensions();

  const payload = {
    lineItem: {
      id: lineItemId,
      count: newQuantity,
    },
  };
  const res = await extensions.updateCartItem(payload);
  mutate('/action/cart/getCart', res);
};

export const updateCart = async (payload: CartDetails): Promise<Cart> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.updateCart(payload);
  mutate('/action/cart/getCart', res);
  return res;
};

export const setShippingMethod = async (shippingMethodId: string) => {
  const extensions = SDK.getExtensions();

  const payload = {
    shippingMethod: {
      id: shippingMethodId,
    },
  };

  const res = await extensions.setShippingMethod(payload);
  mutate('/action/cart/getCart', res);
};

export const redeemDiscountCode = async (code: string) => {
  const extensions = SDK.getExtensions();

  const payload = {
    code: code,
  };
  const res = await extensions.redeemDiscountCode(payload);

  if ((res as Cart).cartId) {
    mutate('/action/cart/getCart', res);
  } else {
    throw new Error('code not valid');
  }
};

export const removeDiscountCode = async (discount: Discount) => {
  const extensions = SDK.getExtensions();

  const res = await extensions.removeDiscountCode({ discountId: discount.discountId });
  mutate('/action/cart/getCart', res);
};
