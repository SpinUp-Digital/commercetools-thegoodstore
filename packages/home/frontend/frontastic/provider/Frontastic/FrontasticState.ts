import {
  getAccount,
  changePassword,
  confirm,
  resendVerificationEmail,
  login,
  logout,
  register,
  requestPasswordReset,
  resetPassword,
  update,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
} from '../../actions/account';
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
import { getWishlist, addToWishlist, removeLineItem, updateLineItem } from '../../actions/wishlist';
import { queryCategories } from '../../actions/product';
import { createSession, adyenCheckout } from '../../actions/adyen';
import { UseAccount } from './UseAccount';
import { UseCart } from './UseCart';
import { UseWishlist } from './UseWishlist';
import { UseProduct } from './UseProduct';
import { UseAdyen } from './UseAdyen';

export interface FrontasticState {
  useCart: UseCart;
  useAccount: UseAccount;
  useWishlist: UseWishlist;
  useProduct: UseProduct;
  useAdyen: UseAdyen;
}

export const getFrontasticState = (): FrontasticState => {
  return {
    useCart: {
      ...cartItems(),
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
      ...getAccount(),
      login,
      logout,
      register,
      confirm,
      resendVerificationEmail,
      changePassword,
      requestPasswordReset,
      resetPassword,
      update,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultBillingAddress,
      setDefaultShippingAddress,
    },
    useWishlist: {
      ...getWishlist(),
      addToWishlist,
      removeLineItem,
      updateLineItem,
    },
    useProduct: {
      ...queryCategories(),
    },
    useAdyen: {
      createSession,
      adyenCheckout,
    },
  };
};
