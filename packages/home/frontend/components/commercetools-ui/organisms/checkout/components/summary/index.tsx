import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Accordion from 'components/commercetools-ui/atoms/accordion';
import Button from 'components/commercetools-ui/atoms/button';
import DiscountForm from 'components/commercetools-ui/organisms/order-summary/discount-form';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic';
import Image from 'frontastic/lib/image';
import { useCheckout } from '../../provider';
import CartSummary from '../cart-summary';

interface Props {
  isFinalStep: boolean;
  onPurchase: () => void;
}

const Summary: React.FC<Props> = ({ isFinalStep, onPurchase }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });

  const accordionRef = useRef<HTMLDivElement>(null);

  const { data, transaction, isEmpty, isShippingAccurate } = useCart();

  const { processing } = useCheckout();

  const { locale, ...router } = useRouter();

  const hiddenItemsCount = (data?.lineItems?.length ?? 0) - 3;

  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  useEffect(() => {
    if (isFinalStep && accordionRef.current)
      accordionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [isFinalStep]);

  return (
    <div className="bg-white py-16 md:mt-24 lg:mt-0 lg:min-w-[35%] lg:p-36">
      <div className="px-16 md:px-24 lg:px-0">
        <h3 className="text-16 leading-[22px] md:text-18">
          {formatCartMessage({ id: 'order.summary', defaultMessage: 'Order summary' })}
        </h3>
      </div>
      <div className="relative mt-30 hidden gap-20 pr-[65px] lg:block">
        <div className={`grid grid-cols-3 gap-16 overflow-hidden ${!isSummaryExpanded ? 'max-h-[104px]' : ''}`}>
          {data?.lineItems?.map((lineItem) => (
            <div
              key={lineItem.lineItemId}
              className="relative h-[104px] cursor-pointer"
              onClick={() => router.push(lineItem._url ?? '')}
            >
              <Image layout="fill" src={lineItem.variant?.images?.[0]} objectFit="contain" suffix="small" />
            </div>
          ))}
        </div>
        {hiddenItemsCount > 0 && (
          <div
            className="absolute right-0 top-[40px] flex cursor-pointer items-center"
            onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
          >
            <span className={`text-14 text-secondary-black ${isSummaryExpanded ? 'opacity-0' : ''}`}>
              + {hiddenItemsCount}
            </span>
            <ChevronDownIcon
              strokeWidth={1}
              className="w-24 transition"
              style={{ transform: isSummaryExpanded ? 'rotateZ(-180deg)' : '' }}
            />
          </div>
        )}
      </div>
      <Accordion
        closedSectionTitle={formatCheckoutMessage({ id: 'discount.apply', defaultMessage: 'Apply a discount' })}
        buttonClassName="text-secondary-black border-y border-neutral-400 py-16 mt-16 md:mt-24 lg:mt-28"
        buttonWrapperClassName="px-16 md:px-24 lg:px-0"
        panelClassName="px-16 md:px-24 lg:px-0"
        iconClassName="w-24"
      >
        <DiscountForm />
      </Accordion>
      <div className="lg:hidden">
        <Accordion
          key={isFinalStep.toString()}
          ref={accordionRef}
          defaultOpen={isFinalStep}
          closedSectionTitle={formatCheckoutMessage({ id: 'yourOrder', defaultMessage: 'Your order' })}
          buttonClassName="text-secondary-black border-b border-neutral-400 py-16"
          buttonWrapperClassName="px-16 md:px-24 lg:px-0"
          iconClassName="w-24"
          collapsedLabel={CurrencyHelpers.formatForCurrency(transaction.total, locale)}
        >
          <CartSummary />
        </Accordion>
      </div>
      <div className="mt-16 hidden bg-white py-16 pb-24 text-16 lg:block lg:pb-0">
        {!isEmpty && (
          <div className="border-b border-neutral-400 pb-18">
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
                <span>
                  {isShippingAccurate
                    ? formatCartMessage({ id: 'shippingCosts', defaultMessage: 'Shipping costs' })
                    : formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Est. Shipping' })}{' '}
                </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.shipping, locale)}</span>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <span>{formatCartMessage({ id: 'tax', defaultMessage: 'Tax' })} </span>
              <span>{CurrencyHelpers.formatForCurrency(transaction.tax, locale)}</span>
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between text-18 font-medium">
          <span>{formatCartMessage({ id: 'total', defaultMessage: 'Total' })} </span>
          <span>{CurrencyHelpers.formatForCurrency(transaction.total, locale)}</span>
        </div>

        <div className="mt-20 hidden lg:block">
          <Button
            variant="primary"
            disabled={!isFinalStep}
            className="w-full"
            type="submit"
            onClick={onPurchase}
            loading={processing}
          >
            {formatCheckoutMessage({ id: 'complete.purchase', defaultMessage: 'Complete purchase' })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
