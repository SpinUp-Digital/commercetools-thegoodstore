import React, { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import AccordionBtn from 'components/commercetools-ui/atoms/accordion';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic';
import { NextFrontasticImage } from 'frontastic/lib/image';
import DiscountForm from '../discount-form';
import { EmptyState } from '../empty-state';
import { Link } from '../header/types';
import CartItem from './item';

export interface Props {
  emptyStateImage: NextFrontasticImage;
  emptyStateTitle: string;
  emptyStateSubtitle: string;
  emptyStateCategories: Link[];
}

const Cart: FC<Props> = ({ emptyStateImage, emptyStateTitle, emptyStateSubtitle, emptyStateCategories }) => {
  const { locale } = useRouter();

  //i18n messages
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const { data } = useCart();

  const isEmpty = data?.lineItems?.length === 0;

  const transaction = useMemo(() => {
    if (!data?.lineItems)
      return {
        subtotal: { centAmount: 0 },
        discount: { centAmount: 0 },
        tax: { centAmount: 0 },
        shipping: { centAmount: 0 },
        total: { centAmount: 0 },
      };

    const currencyCode = data.sum?.currencyCode;
    const fractionDigits = data.sum?.fractionDigits;

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
  }, [data]);

  return (
    <>
      {isEmpty ? (
        <EmptyState
          className="grow bg-neutral-200"
          categories={emptyStateCategories}
          image={emptyStateImage}
          title={emptyStateTitle}
          subtitle={emptyStateSubtitle}
        />
      ) : (
        <div className="h-[65vh] grow divide-y divide-neutral-400 overflow-auto px-12 md:px-22">
          {data?.lineItems?.map((lineItem) => (
            <CartItem key={lineItem.lineItemId} item={lineItem} />
          ))}
        </div>
      )}
      <div className="absolute bottom-0 w-full">
        {!isEmpty && (
          <div className="border-t border-neutral-400 px-12 py-24 md:px-22">
            <AccordionBtn
              closedSectionTitle={formatCartMessage({ id: 'discount.apply', defaultMessage: 'Apply a discount' })}
              buttonClassName="text-14 text-secondary-black"
            >
              <DiscountForm />
            </AccordionBtn>
          </div>
        )}
        <div className="border-t  border-neutral-400 bg-white px-12 pt-16 pb-18 md:px-22">
          {!isEmpty && (
            <>
              <div className="flex items-center justify-between text-14">
                <span>{formatCartMessage({ id: 'subtotal', defaultMessage: 'Subtotal' })} </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.subtotal, locale)}</span>
              </div>

              {transaction.discount.centAmount > 0 && (
                <div className="flex items-center justify-between text-14">
                  <span>{formatCartMessage({ id: 'discount', defaultMessage: 'Discount' })} </span>
                  <span>{CurrencyHelpers.formatForCurrency(transaction.discount, locale)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-14">
                <span>{formatCartMessage({ id: 'tax', defaultMessage: 'Tax' })} </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.tax, locale)}</span>
              </div>

              {transaction.shipping.centAmount > 0 && (
                <div className="flex items-center justify-between text-14">
                  <span>{formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Est. Shipping' })} </span>
                  <span>{CurrencyHelpers.formatForCurrency(transaction.shipping, locale)}</span>
                </div>
              )}
            </>
          )}

          <div className="mt-26 flex items-center justify-between font-medium">
            <span>{formatCartMessage({ id: 'total', defaultMessage: 'Total' })}: </span>
            <span>{CurrencyHelpers.formatForCurrency(transaction.total, locale)}</span>
          </div>

          <div className="mt-16">
            <button
              disabled={isEmpty}
              className="w-full rounded-md bg-primary-black py-12 font-medium text-white transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              {formatCartMessage({ id: 'checkout.go', defaultMessage: 'Go to checkout' })}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
