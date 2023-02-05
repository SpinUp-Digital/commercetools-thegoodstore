import React from 'react';
import { useRouter } from 'next/router';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic';
import Image from 'frontastic/lib/image';

const CartSummary = () => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const { locale } = useRouter();

  const { data, transaction, isEmpty } = useCart();

  return (
    <div>
      <div className="divide-y divide-neutral-400 px-16 md:px-24">
        {data?.lineItems?.map((lineItem) => (
          <div key={lineItem.lineItemId} className="flex items-center justify-between">
            <div className="flex items-start gap-16 py-16 md:gap-32">
              <div className="relative h-[104px] w-[89px] shrink-0">
                <Image layout="fill" src={lineItem.variant?.images?.[0]} objectFit="contain" />
              </div>
              <div className="mt-10 grow overflow-hidden">
                <span className="block max-w-[100%] truncate text-12 capitalize md:text-14 md:text-14">
                  {lineItem.name}
                </span>
                <span className="mt-8 block text-12 font-medium md:hidden">
                  {CurrencyHelpers.formatForCurrency(lineItem.price ?? {}, locale)}
                </span>
                <span className="mt-12 block text-14 text-secondary-black">x {lineItem.count}</span>
              </div>
            </div>
            <span className="mt-8 hidden text-16 font-medium md:block">
              {CurrencyHelpers.formatForCurrency(lineItem.price ?? {}, locale)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-16 bg-neutral-200 p-16 pb-24 text-14 md:text-16">
        {!isEmpty && (
          <>
            <div className="flex items-center justify-between">
              <span>{formatCartMessage({ id: 'subtotal', defaultMessage: 'Subtotal' })} </span>
              <span>{CurrencyHelpers.formatForCurrency(transaction.subtotal, locale)}</span>
            </div>

            {transaction.discount.centAmount > 0 && (
              <div className="mt-8 flex items-center justify-between">
                <span>{formatCartMessage({ id: 'discount', defaultMessage: 'Discount' })} </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.discount, locale)}</span>
              </div>
            )}

            {transaction.shipping.centAmount > 0 && (
              <div className="mt-8 flex items-center justify-between">
                <span>{formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Est. Shipping' })} </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.shipping, locale)}</span>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <span>{formatCartMessage({ id: 'tax', defaultMessage: 'Tax' })} </span>
              <span>{CurrencyHelpers.formatForCurrency(transaction.tax, locale)}</span>
            </div>
          </>
        )}

        <div className="mt-20 flex items-center justify-between text-16 font-medium">
          <span>{formatCartMessage({ id: 'total', defaultMessage: 'Total' })}: </span>
          <span>{CurrencyHelpers.formatForCurrency(transaction.total, locale)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
