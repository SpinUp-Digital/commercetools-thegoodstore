import { useMemo } from 'react';
import { Cart } from '@commercetools/frontend-domain-types/cart/Cart';
import { Wishlist } from '@commercetools/frontend-domain-types/wishlist/Wishlist';
import useI18n from 'helpers/hooks/useI18n';
import {
  getAccount,
  changePassword,
  confirm,
  requestConfirmationEmail,
  login,
  logout,
  register,
  requestPasswordReset,
  resetPassword,
  update,
  updateSubscription,
  addAddress,
  addBillingAddress,
  addShippingAddress,
  updateAddress,
  removeAddress,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
} from '../../actions/account';
import { createSession, adyenCheckout } from '../../actions/adyen';
import {
  cartItems,
  addItem,
  orderCart,
  orderHistory,
  removeItem,
  shippingMethods,
  setShippingMethod,
  updateCart,
  updateItem,
  redeemDiscountCode,
  removeDiscountCode,
  getProjectSettings,
} from '../../actions/cart';
import { queryCategories, query as queryProducts } from '../../actions/product';
import { getWishlist, addToWishlist, removeLineItem, clearWishlist, updateLineItem } from '../../actions/wishlist';
import { UseAccount } from './UseAccount';
import { UseAdyen } from './UseAdyen';
import { UseCart } from './UseCart';
import { UseProduct } from './UseProduct';
import { UseWishlist } from './UseWishlist';

export interface FrontasticState {
  useCart: UseCart;
  useAccount: UseAccount;
  useWishlist: UseWishlist;
  useProduct: UseProduct;
  useAdyen: UseAdyen;
}

export const getFrontasticState = (): FrontasticState => {
  /* I18n */

  /* eslint-disable-next-line react-hooks/rules-of-hooks*/
  const { currency } = useI18n();

  /* Cart */

  const cartData = cartItems();

  const totalCartItems =
    (cartData.data as Cart)?.lineItems?.reduce((acc, curr) => acc + (curr.count as number), 0) ?? 0;

  const isCartEmpty = !cartData?.data?.lineItems?.length;

  /* eslint-disable-next-line react-hooks/rules-of-hooks*/
  const transaction = useMemo(() => {
    const data = cartData.data;

    if (!data?.lineItems)
      return {
        subtotal: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
        discount: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
        tax: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
        shipping: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
        total: { centAmount: 0, currencyCode: currency, fractionDigits: 2 },
      };

    const currencyCode = data.sum?.currencyCode ?? currency;
    const fractionDigits = data.sum?.fractionDigits ?? 2;

    const totalAmount = data.sum?.centAmount as number;
    const subTotalAmount = data.lineItems.reduce(
      (acc, curr) => acc + (curr.price?.centAmount || 0) * (curr.count as number),
      0,
    );
    const discountedAmount = data.lineItems.reduce(
      (acc, curr) =>
        acc + ((curr.price?.centAmount || 0) * (curr.count as number) - (curr.totalPrice?.centAmount || 0)),
      0,
    );

    const totalTax = data.taxed?.taxPortions?.reduce((acc, curr) => acc + (curr.amount?.centAmount as number), 0) ?? 0;
    const totalShipping =
      (data.sum?.centAmount as number) > 0 ? data.availableShippingMethods?.[0]?.rates?.[0]?.price?.centAmount ?? 0 : 0;

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
        centAmount: totalAmount + totalTax + totalShipping,
        currencyCode,
        fractionDigits,
      },
    };
  }, [cartData.data, currency]);

  /* Account */

  const accountData = getAccount();

  /* Wishlist */

  const wishlistData = getWishlist();

  const totalWishlistItems =
    (wishlistData.data as Wishlist)?.lineItems?.reduce((acc, curr) => acc + (curr.count as number), 0) ?? 0;

  /* Categories */

  const categoriesData = queryCategories();

  return {
    useCart: {
      ...cartData,
      totalItems: totalCartItems,
      isEmpty: isCartEmpty,
      transaction,
      addItem,
      updateCart,
      setShippingMethod,
      removeItem,
      updateItem,
      shippingMethods: shippingMethods(),
      orderCart,
      orderHistory,
      getProjectSettings,
      redeemDiscountCode,
      removeDiscountCode,
    },
    useAccount: {
      ...accountData,
      login,
      logout,
      register,
      confirm,
      requestConfirmationEmail,
      changePassword,
      requestPasswordReset,
      resetPassword,
      update,
      updateSubscription,
      addAddress,
      addBillingAddress,
      addShippingAddress,
      updateAddress,
      removeAddress,
      setDefaultBillingAddress,
      setDefaultShippingAddress,
    },
    useWishlist: {
      ...wishlistData,
      totalItems: totalWishlistItems,
      addToWishlist,
      removeLineItem,
      clearWishlist,
      updateLineItem,
    },
    useProduct: {
      ...(categoriesData as unknown as UseProduct),
      query: queryProducts,
    },
    useAdyen: {
      createSession,
      adyenCheckout,
    },
  };
};
