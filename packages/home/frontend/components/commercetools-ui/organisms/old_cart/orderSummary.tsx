import { MouseEvent } from 'react';
import { Cart } from '@commercetools/domain-types/cart/Cart';
import { LineItem } from '@commercetools/domain-types/cart/LineItem';
import { useTranslation, Trans } from 'react-i18next';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import { Reference } from 'types/reference';
import Link from '../../atoms/link';
import DiscountForm from '../discount-form';
import { useRouter } from 'next/router';

interface Props {
  readonly cart: Cart;
  readonly onSubmit?: (e: MouseEvent) => void;
  readonly submitButtonLabel?: string;
  readonly disableSubmitButton?: boolean;
  readonly showSubmitButton?: boolean;
  readonly showDiscountsForm?: boolean;

  termsLink?: Reference;
  cancellationLink?: Reference;
  privacyLink?: Reference;
}

const OrderSummary = ({
  cart,
  onSubmit,
  showSubmitButton = true,
  showDiscountsForm = true,
  submitButtonLabel,
  disableSubmitButton,
  termsLink,
  cancellationLink,
  privacyLink,
}: Props) => {
  const { locale } = useRouter();

  //i18n messages
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { t } = useTranslation(['checkout']);

  const submitButtonClassName = `${disableSubmitButton ? 'opacity-75 pointer-events-none' : ''} ${
    !showDiscountsForm ? 'mt-7' : ''
  } w-full rounded-md border border-transparent py-3 px-4 text-base shadow-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50`;

  const interpolatedComponents = [
    <Link key={0} className="cursor-pointer font-medium hover:underline" link={termsLink} />,
    <Link key={1} className="cursor-pointer font-medium hover:underline" link={cancellationLink} />,
    <Link key={2} className="cursor-pointer font-medium hover:underline" link={privacyLink} />,
  ];

  const totalTaxes = cart?.taxed?.taxPortions?.reduce((a, b) => a + b.amount.centAmount, 0);

  const productPrice = cart?.lineItems.reduce((a, b: LineItem) => {
    if (b.discountedPrice) {
      return a + b.discountedPrice.centAmount * b.count;
    } else {
      return a + b.price.centAmount * b.count;
    }
  }, 0);

  const discountPrice = cart?.lineItems?.reduce((a, b) => {
    return (
      a +
      b.count *
        b.discounts.reduce((x, y) => {
          return x + y.discountedAmount.centAmount;
        }, 0)
    );
  }, 0);

  return (
    <section
      aria-labelledby="summary-heading"
      className="rounded-lg bg-gray-50 py-6 px-4 sm:col-span-8 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        {formatCartMessage({ id: 'order.summary', defaultMessage: 'Order Summary' })}
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">{formatCartMessage({ id: 'subtotal', defaultMessage: 'Subtotal' })}</dt>
          <dd className="text-sm font-medium text-gray-900">
            {CurrencyHelpers.formatForCurrency(productPrice, locale)}
          </dd>
        </div>

        {cart?.shippingInfo && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="flex items-center text-sm text-gray-600">
              <span>{formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Shipping estimate' })}</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              {CurrencyHelpers.formatForCurrency(cart?.shippingInfo?.price || {}, locale)}
            </dd>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex text-sm text-gray-600">
            <span>{formatCartMessage({ id: 'discounts', defaultMessage: 'Discounts' })}</span>
          </dt>
          <dd className="text-sm font-medium text-gray-900">
            {CurrencyHelpers.formatForCurrency(-discountPrice || {}, locale)}
          </dd>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            {formatCartMessage({ id: 'orderTotal', defaultMessage: 'Order total' })}
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {CurrencyHelpers.formatForCurrency(cart?.sum || {}, locale)}
          </dd>
        </div>

        {cart?.taxed && (
          <div className="text-xs text-gray-500">
            (
            {formatCartMessage({
              id: 'includedVat',
              defaultMessage: 'Tax included',
              values: { amount: CurrencyHelpers.formatForCurrency(totalTaxes || {}, locale) },
            })}
            )
          </div>
        )}
      </dl>
      {showDiscountsForm && <DiscountForm className="py-10" />}
      {showSubmitButton && (
        <div>
          <button type="submit" onClick={onSubmit} className={submitButtonClassName}>
            {submitButtonLabel || formatCartMessage({ id: 'checkout', defaultMessage: 'Checkout' })}
          </button>

          {submitButtonLabel === formatCartMessage({ id: 'ContinueAndPay', defaultMessage: 'Continue and pay' }) && (
            <p className="px-1 py-5 text-center text-xs">
              <Trans i18nKey="disclaimer" t={t} components={interpolatedComponents} />
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default OrderSummary;
