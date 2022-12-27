import { Cart } from '@commercetools/frontend-domain-types/cart/Cart';
import { Wishlist } from '@commercetools/frontend-domain-types/wishlist/Wishlist';
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
import { queryCategories } from '../../actions/product';
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
  const cartData = cartItems();
  const totalCartItems =
    (cartData.data as Cart)?.lineItems?.reduce((acc, curr) => acc + (curr.count as number), 0) ?? 0;

  const accountData = getAccount();

  const wishlistData = getWishlist();

  const totalWishlistItems =
    (wishlistData.data as Wishlist)?.lineItems?.reduce((acc, curr) => acc + (curr.count as number), 0) ?? 0;

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
    },
    useAdyen: {
      createSession,
      adyenCheckout,
    },
  };
};
