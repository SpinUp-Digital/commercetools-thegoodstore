import React from 'react';
import { useRouter } from 'next/router';
import AccordionBtn from 'components/commercetools-ui/atoms/accordion';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import DiscountForm from '../discount-form';

export interface PaymentMethod {
  name: string;
  image: NextFrontasticImage;
}

export interface Props {
  hideCheckoutButton?: boolean;
  paymentMethods?: Array<PaymentMethod>;
}

const OrderSummary: React.FC<Props> = ({ hideCheckoutButton = false, paymentMethods = [] }) => {
  const { locale } = useRouter();

  //i18n messages
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const { isEmpty, transaction } = useCart();

  return (
    <div>
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
      <div className="border-t border-neutral-400 bg-white px-12 pt-16 pb-18 md:px-22">
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
          <span>{formatCartMessage({ id: 'total', defaultMessage: 'Total' })} </span>
          <span>{CurrencyHelpers.formatForCurrency(transaction.total, locale)}</span>
        </div>

        {!hideCheckoutButton && (
          <div className="mt-16">
            <button
              disabled={isEmpty}
              className="w-full rounded-md bg-primary-black py-12 font-medium text-white transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              {formatCartMessage({ id: 'checkout.go', defaultMessage: 'Go to checkout' })}
            </button>
          </div>
        )}

        {paymentMethods.length > 0 && (
          <div className="lg:mt-28">
            <div className="hidden lg:block">
              <p className="text-14 leading-[20px] text-secondary-black">
                {formatCartMessage({ id: 'we.accept', defaultMessage: 'We accept' })}
              </p>
            </div>
            <div className="mt-26 flex items-center justify-center gap-14 lg:mt-18 lg:justify-start">
              {paymentMethods.map(({ name, image }) => (
                <div key={name} className="relative h-30 w-30">
                  <Image {...image} layout="fill" objectFit="contain" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
