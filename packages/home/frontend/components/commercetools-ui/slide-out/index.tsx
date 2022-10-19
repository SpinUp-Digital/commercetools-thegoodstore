import React, { useCallback, useMemo, useState } from 'react';
import CartIcon from 'components/icons/cart';
import CloseIcon from 'components/icons/close';
import HeartIcon from 'components/icons/heart';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useClickOutside from 'helpers/hooks/useClickOutside';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart, useWishlist } from 'frontastic';
import DiscountForm from '../discount-form';
import CartItem from './cart-item';

export type State = 'wishlist' | 'cart';

export interface Props {
  state?: State;
  changeState?: (newState?: State) => void;
  onClose?: () => void;
}

const Slideout: React.FC<Props> = ({ state, changeState, onClose }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const { data: cartData, totalItems: totalCartItems } = useCart();

  const { data: wishlistData } = useWishlist();

  const cartItems = useMemo(() => cartData?.lineItems, [cartData]);
  const wishlistItems = useMemo(() => wishlistData?.lineItems, [wishlistData]);

  const title = useMemo(() => {
    switch (state) {
      case 'cart':
        return formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' });
      case 'wishlist':
        return formatWishlistMessage({ id: 'myWishlist', defaultMessage: 'My Wishlist' });
    }
  }, [state]);

  const { ref } = useClickOutside(() => !!state && onClose());

  const getStateStyles = useCallback(() => {
    if (state) return 'opacity-1';
    else return 'translate-x-full opacity-0';
  }, [state]);

  const transaction = useMemo(() => {
    if (!cartData?.lineItems)
      return {
        subtotal: { centAmount: 0 },
        discount: { centAmount: 0 },
        tax: { centAmount: 0 },
        shipping: { centAmount: 0 },
        total: { centAmount: 0 },
      };

    const currencyCode = cartData.sum.currencyCode;
    const fractionDigits = cartData.sum.fractionDigits;

    return {
      subtotal: {
        centAmount: cartData.lineItems.reduce(
          (acc, curr) =>
            acc +
            (curr.totalPrice?.centAmount || 0) +
            curr.discounts.reduce((acc1, curr1) => acc1 + (curr1.discountedAmount.centAmount || 0), 0),
          0,
        ),
        currencyCode,
        fractionDigits,
      },
      discount: {
        centAmount: cartData.lineItems.reduce(
          (acc, curr) =>
            acc + (curr.discounts?.reduce((acc1, curr1) => acc1 + curr1.discountedAmount.centAmount, 0) || 0),
          0,
        ),
        currencyCode,
        fractionDigits,
      },
      shipping: cartData.shippingInfo?.price ?? {},
      tax: {
        centAmount: cartData.taxed?.taxPortions?.reduce((acc, curr) => acc + curr.amount?.centAmount, 0) ?? 0,
        currencyCode,
        fractionDigits,
      },
      total: cartData.sum,
    };
  }, [cartData]);

  const ActiveSection = useMemo(() => {
    if (state === 'cart') {
      return (
        <>
          <div className="grow divide-y divide-neutral-400 overflow-auto px-12 md:px-22">
            {cartData.lineItems?.map((lineItem) => (
              <CartItem key={lineItem.lineItemId} item={lineItem} />
            ))}
          </div>
          <div className="border-t border-neutral-400 px-12 pt-16 pb-24 md:px-22">
            <DiscountForm />
          </div>
          <div className="border-t border-neutral-400 bg-white px-12 pt-16 pb-18 md:px-22">
            <div className="flex items-center justify-between">
              <span>{formatCartMessage({ id: 'subtotal', defaultMessage: 'Subtotal' })}: </span>
              <span>{CurrencyHelpers.formatForCurrency(transaction.subtotal)}</span>
            </div>

            {transaction.discount.centAmount > 0 && (
              <div className="flex items-center justify-between">
                <span>{formatCartMessage({ id: 'discount', defaultMessage: 'Discount' })}: </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.discount)}</span>
              </div>
            )}

            {transaction.tax.centAmount > 0 && (
              <div className="flex items-center justify-between">
                <span>{formatCartMessage({ id: 'tax', defaultMessage: 'Tax' })}: </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.tax)}</span>
              </div>
            )}

            {transaction.shipping.centAmount > 0 && (
              <div className="flex items-center justify-between">
                <span>{formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Est. Shipping' })}: </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.shipping)}</span>
              </div>
            )}

            <div className="mt-26 flex items-center justify-between text-18 font-semibold">
              <span>{formatCartMessage({ id: 'total', defaultMessage: 'Total' })}: </span>
              <span>{CurrencyHelpers.formatForCurrency(transaction.total)}</span>
            </div>

            <div className="mt-16">
              <button className="w-full rounded-md bg-primary-black py-12 font-medium text-white">
                {formatCartMessage({ id: 'checkout.go', defaultMessage: 'Go to checkout' })}
              </button>
            </div>
          </div>
        </>
      );
    }
  }, [state, cartData, wishlistData, transaction, formatCartMessage]);

  return (
    <div
      ref={ref}
      className={`fixed right-0 top-0 z-50 flex h-screen w-[90%] max-w-[380px] flex-col items-stretch bg-neutral-200 shadow-lg transition duration-300 ease-out ${getStateStyles()}`}
    >
      <div className="flex items-center justify-between border-b border-neutral-400 px-12 pt-24 md:px-22 md:pt-32">
        <h3 className="pb-24 text-18 font-bold leading-normal md:pb-32 md:text-20">{title}</h3>
        <div className=" flex h-full items-center gap-24 sm:gap-36">
          <div
            className="relative h-full cursor-pointer hover:opacity-80 md:pb-32"
            onClick={() => changeState?.('wishlist')}
          >
            <div
              className={`absolute -bottom-1 h-2 w-full transition duration-200 ${
                state === 'wishlist' ? 'bg-secondary-grey ease-out' : 'bg-transparent ease-in'
              }`}
            />
            {wishlistItems?.length > 0 && (
              <span className="absolute top-[-7px] right-[-7px] h-8 w-8 rounded-full bg-green-500" />
            )}
            <HeartIcon className="mt-2 h-20 w-20 md:h-24 md:w-24" pathClassName="stroke-secondary-black stroke-2" />
          </div>
          <div
            className="relative h-full cursor-pointer hover:opacity-80 md:pb-32"
            onClick={() => changeState?.('cart')}
          >
            {cartItems?.length > 0 && (
              <>
                <span className="absolute top-[-4px] right-[-3px] h-8 w-8 rounded-full bg-green-500" />
                <span className="absolute top-[15px] left-1/2 -translate-x-1/2 text-10">
                  {totalCartItems > 9 ? '9+' : totalCartItems}
                </span>
              </>
            )}
            <div
              className={`absolute -bottom-1 h-2 w-full transition duration-200  ${
                state === 'cart' ? 'bg-secondary-grey ease-out' : 'bg-transparent ease-in'
              }`}
            />
            <CartIcon className="h-24 w-24 md:h-26 md:w-26" />
          </div>
          <div onClick={onClose} className="cursor-pointer pb-24 md:pb-32">
            <CloseIcon className="h-18 w-18" />
          </div>
        </div>
      </div>
      {ActiveSection}
    </div>
  );
};

export default Slideout;
