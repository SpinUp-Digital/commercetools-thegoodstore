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
import { Cart } from '@Types/cart/Cart';

export interface FrontasticState {
  useCart: UseCart;
  useAccount: UseAccount;
  useWishlist: UseWishlist;
  useProduct: UseProduct;
  useAdyen: UseAdyen;
}

export const getFrontasticState = (): FrontasticState => {
  const cartData = cartItems();
  const totalCartItems = (cartData.data as Cart)?.lineItems?.reduce((acc, curr) => acc + curr.count, 0) ?? 0;

  const accountData = getAccount();

  const wishlistData = getWishlist();

  const categoriesData = queryCategories();

  return {
    useCart: {
      ...cartData,
      totalItems: totalCartItems,
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
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultBillingAddress,
      setDefaultShippingAddress,
    },
    useWishlist: {
      ...wishlistData,
      addToWishlist,
      removeLineItem,
      updateLineItem,
    },
    useProduct: {
      ...categoriesData,
    },
    useAdyen: {
      createSession,
      adyenCheckout,
    },
  };
};
