import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import AccordionBtn from 'components/commercetools-ui/atoms/accordion';
import Link from 'components/commercetools-ui/atoms/link';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import DiscountForm from '../discount-form';

export interface PaymentMethod {
  name: string;
  image: NextFrontasticImage;
}

export interface ButtonProps {
  text?: string;
  link?: string;
  disabled?: boolean;
}

export interface ClassNames {
  button?: string;
  applyDiscountButton?: string;
  infoContainer?: string;
  totalAmountContainer?: string;
}

export interface Props {
  hideCheckoutButton?: boolean;
  paymentMethods?: Array<PaymentMethod>;
  button?: ButtonProps;
  classNames?: ClassNames;
}

const OrderSummary: React.FC<Props> = ({
  hideCheckoutButton = false,
  paymentMethods = [],
  button = {},
  classNames = {},
}) => {
  const { locale } = useRouter();

  //i18n messages
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const { isEmpty, transaction } = useCart();

  const closeActiveFlyouts = useCallback(() => {
    //Trigger an `ESC` key click to close any active flyouts
    const event = new Event('keyup') as KeyboardEvent;
    (event.key as string) = 'Escape';
    document.dispatchEvent(event);
  }, []);

  return (
    <div>
      {!isEmpty && (
        <div className={`border-t border-neutral-400 ${classNames.applyDiscountButton ?? ''}`}>
          <AccordionBtn
            closedSectionTitle={formatCartMessage({ id: 'discount.apply', defaultMessage: 'Apply a discount' })}
            buttonClassName="text-14 text-secondary-black"
          >
            <DiscountForm />
          </AccordionBtn>
        </div>
      )}
      <div className={`border-t border-neutral-400 bg-white text-14 ${classNames.infoContainer}`}>
        {!isEmpty && (
          <>
            <div className="flex items-center justify-between">
              <span>{formatCartMessage({ id: 'subtotal', defaultMessage: 'Subtotal' })} </span>
              <span>{CurrencyHelpers.formatForCurrency(transaction.subtotal, locale)}</span>
            </div>

            {transaction.discount.centAmount > 0 && (
              <div className="flex items-center justify-between">
                <span>{formatCartMessage({ id: 'discount', defaultMessage: 'Discount' })} </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.discount, locale)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span>{formatCartMessage({ id: 'tax', defaultMessage: 'Tax' })} </span>
              <span>{CurrencyHelpers.formatForCurrency(transaction.tax, locale)}</span>
            </div>

            {transaction.shipping.centAmount > 0 && (
              <div className="flex items-center justify-between">
                <span>{formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Est. Shipping' })} </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.shipping, locale)}</span>
              </div>
            )}
          </>
        )}

        <div
          className={`mt-26 flex items-center justify-between text-16 font-medium ${
            classNames.totalAmountContainer ?? ''
          }`}
        >
          <span>{formatCartMessage({ id: 'total', defaultMessage: 'Total' })} </span>
          <span>{CurrencyHelpers.formatForCurrency(transaction.total, locale)}</span>
        </div>

        {!hideCheckoutButton && (
          <div className="mt-16">
            <Link link={button.link}>
              <button
                disabled={button.disabled}
                className="w-full rounded-md bg-primary-black py-12 font-medium text-white transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
                onClick={closeActiveFlyouts}
              >
                {button.text}
              </button>
            </Link>
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
