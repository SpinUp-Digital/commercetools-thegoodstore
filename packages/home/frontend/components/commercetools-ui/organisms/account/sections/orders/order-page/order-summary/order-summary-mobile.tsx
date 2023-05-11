import React, { FC, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Accordion from 'components/commercetools-ui/atoms/accordion';
import Typography from 'components/commercetools-ui/atoms/typography';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { Order } from 'types/order';
import Image from 'frontastic/lib/image';
import useOrderTransactions from '../../helper-hooks/useOrderTransaction';

export interface Props {
  order?: Order;
}

const OrderSummaryMobile: FC<React.PropsWithChildren<Props>> = ({ order }) => {
  const { locale } = useRouter();

  const {
    subtotal: getSubtotal,
    shipmentFees: getShipmentFees,
    totalTax: getTotalTax,
    total: getTotal,
  } = useOrderTransactions(order);

  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });

  const [open, setOpen] = useState(false);

  const accordionClassNames = useClassNames([' block 2xl:hidden my-24 lg:mt-40']);

  const accordionContentClassNames = useClassNames([
    'flex w-full justify-between border-y py-16',
    open ? 'border-t' : '',
  ]);

  const lineItemClassNames = (order: Order, index: number) => {
    return `
      flex justify-start py-16
      ${order?.lineItems && index === order.lineItems.length - 1 ? '' : 'border-b'}`;
  };

  const arrowClassNames = useClassNames([open ? 'rotate-180 transform' : '', 'transition mr-8']);
  const orderSummaryAccordion = useMemo(() => {
    return (
      <div className="px-16 md:px-24 lg:px-44">
        <div className={accordionContentClassNames} onClick={() => setOpen(!open)}>
          <Typography fontSize={16} className="text-secondary-black">
            {formatOrdersMessage({
              id: 'your.order',
              defaultMessage: 'Your Order',
            })}
          </Typography>

          <div className="flex">
            <Typography fontSize={16} medium className="hidden pr-8 text-primary-black md:block">
              {getTotal}
            </Typography>
            <ChevronDownIcon width={20} strokeWidth={1.5} className={arrowClassNames} />
          </div>
        </div>
      </div>
    );
  }, [open, arrowClassNames, formatOrdersMessage, getTotal, accordionContentClassNames]);

  return (
    <Accordion customClosedButton={orderSummaryAccordion} className={accordionClassNames} buttonClassName="w-full">
      <div className="grid max-h-[400px] w-full grid-cols-1 overflow-auto px-16 md:px-24 lg:px-44">
        {order?.lineItems?.map((lineItem, index) => (
          <div key={lineItem.lineItemId} className={lineItemClassNames(order, index)}>
            {lineItem.variant?.images?.[0] && (
              <div className="relative h-[104px] w-[88px] shrink-0">
                <Image fill src={lineItem.variant.images[0]} style={{ objectFit: 'contain' }} />
              </div>
            )}
            <div className="flex flex-col justify-center pl-16">
              <Typography fontSize={14} className="uppercase text-primary-black">
                {lineItem?.name}
              </Typography>
              <Typography fontSize={14} medium className="mt-8 text-primary-black">
                {CurrencyHelpers.formatForCurrency(lineItem?.price as number, locale)}
              </Typography>
              <Typography fontSize={14} className="mt-8 text-primary-black">
                {`x ${lineItem?.count}`}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8 bg-neutral-200 p-16 md:px-24 lg:px-44">
        <div className="flex justify-between">
          <Typography fontSize={16} className="text-secondary-black">
            {formatOrdersMessage({
              id: 'subtotal',
              defaultMessage: 'Subtotal',
            })}
          </Typography>
          <Typography fontSize={16} className="text-secondary-black">
            {getSubtotal}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography fontSize={16} className="text-secondary-black">
            {formatOrdersMessage({
              id: 'shipping',
              defaultMessage: 'Est. Shipping',
            })}
          </Typography>
          <Typography fontSize={16} className="text-secondary-black">
            {getShipmentFees}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography fontSize={16} className="text-secondary-black">
            {formatOrdersMessage({
              id: 'tax',
              defaultMessage: 'Tax',
            })}
          </Typography>
          <Typography fontSize={16} className="text-secondary-black">
            {getTotalTax}
          </Typography>
        </div>
        <div className="mt-16 flex justify-between">
          <Typography fontSize={18} medium className="text-secondary-black">
            {formatOrdersMessage({
              id: 'order.total',
              defaultMessage: 'Total:',
            })}
          </Typography>
          <Typography fontSize={18} medium className="text-secondary-black">
            {getTotal}
          </Typography>
        </div>
      </div>
    </Accordion>
  );
};

export default OrderSummaryMobile;
