import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Money } from '@commercetools/frontend-domain-types/product/Money';
import Accordion from 'components/commercetools-ui/atoms/accordion';
import Typography from 'components/commercetools-ui/atoms/typography';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { Order } from 'types/order';
import OrderSummaryList from './order-summary-list';
import OrdersAccordionButton from './ordersAccordionButton';
import PrintButton from './printButton';

type OrderSummaryProps = {
  order: Order;
  onPrint: () => void;
};

const OrderSummary: FC<OrderSummaryProps> = ({ order, onPrint }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage } = useFormat({ name: 'thank-you' });

  const { locale } = useRouter();

  const summaryInfo: Array<{ label: string; value?: Money }> = [
    {
      label: formatCartMessage({ id: 'subtotal', defaultMessage: 'Subtotal' }),
      value: order.subtotal,
    },
    {
      label: formatCartMessage({ id: 'discount', defaultMessage: 'Discount' }),
      value: order.shippingInfo?.discountedPrice,
    },
    {
      label: formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Est. Shipping' }),
      value: order.shippingInfo?.price,
    },
    {
      label: formatCartMessage({ id: 'tax', defaultMessage: 'Tax' }),
      value: order.taxed?.amount,
    },
  ];

  return (
    <div className="grow bg-white px-16 md:px-24 lg:p-36">
      <Typography
        as="h4"
        fontFamily="libre"
        fontSize={16}
        className="my-16 leading-[20px] text-primary-black md:mb-0 md:border-b md:border-neutral-400 md:pb-16 md:text-18 lg:m-0 lg:border-b-0 lg:pb-28"
      >
        {formatMessage({ id: 'order.details', defaultMessage: 'Order details' })}
      </Typography>

      <OrderSummaryList
        className={useClassNames([{ 'lg:hidden': !!order.lineItems && order.lineItems.length > 1 }])}
        order={order}
      />

      {order.lineItems && order.lineItems.length > 1 && (
        <Accordion
          closedSectionTitle={formatMessage({ id: 'your.order', defaultMessage: 'Your order' })}
          className="divide-y divide-neutral-400 lg:pt-0"
          buttonClassName="py-16 border-y border-neutral-400"
          customCloseButton={<OrdersAccordionButton order={order} />}
        >
          <OrderSummaryList className="max-h-316 divide-y divide-neutral-400 overflow-scroll" order={order} />
        </Accordion>
      )}

      {/* Order summary info */}
      <div className="grid gap-8 border-t border-neutral-400 bg-white py-16 lg:pt-32">
        {summaryInfo.map(({ label, value }, index) => {
          if (!value || value <= 0) return <></>;
          return (
            <div key={index} className="flex items-center justify-between">
              <Typography fontSize={14} className=" text-primary-black md:text-16">
                {label}
              </Typography>
              <Typography fontSize={14} className="text-primary-black md:text-16">
                {CurrencyHelpers.formatForCurrency(value, locale)}
              </Typography>
            </div>
          );
        })}

        <div className="mt-16 flex items-center justify-between lg:mt-12 lg:border-t lg:border-neutral-400 lg:pt-12">
          <Typography fontSize={16} className="text-primary-black md:text-18 lg:leading-loose" medium>
            {formatCartMessage({ id: 'total', defaultMessage: 'Total' }) + ':'}
          </Typography>
          <Typography fontSize={16} className="text-primary-black md:text-18 lg:leading-loose" medium>
            {CurrencyHelpers.formatForCurrency(order?.sum, locale)}
          </Typography>
        </div>
      </div>

      <PrintButton onPrint={onPrint} className="hidden w-full lg:block" />
    </div>
  );
};

export default OrderSummary;
