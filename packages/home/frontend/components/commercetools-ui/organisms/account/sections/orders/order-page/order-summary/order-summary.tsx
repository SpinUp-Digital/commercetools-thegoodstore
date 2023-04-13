import React, { FC, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { LineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Accordion from 'components/commercetools-ui/atoms/accordion';
import Typography from 'components/commercetools-ui/atoms/typography';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import Image from 'frontastic/lib/image';

export interface Props {
  hiddenItemsCount: number;
  subtotal: string;
  shipmentFees: string;
  totalTax: string;
  total: string;
  lineItems: LineItem[];
}

const OrderSummary: FC<Props> = ({ hiddenItemsCount, subtotal, shipmentFees, totalTax, total, lineItems }) => {
  const { locale } = useRouter();

  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });

  const [open, setOpen] = useState(false);

  const lineItemOrderSummary = useMemo(() => {
    if (lineItems.length < 3) return lineItems;
    else return [lineItems[0], lineItems[1], lineItems[2]];
  }, [lineItems]);

  const accordionClassNames = useClassNames(['max-h-[400px] overflow-auto', open ? 'border-b' : '']);

  const arrowClassNames = useClassNames([open ? 'rotate-180 transform' : '', 'transition mr-8']);
  const orderSummaryAccordion = useMemo(() => {
    return (
      <div className="flex w-full flex-col overflow-x-visible border-b pb-4">
        <div className="flex w-full justify-between">
          <Typography fontSize={16} className="text-secondary-black">
            {formatOrdersMessage({
              id: 'your.order',
              defaultMessage: 'Your Order',
            })}
          </Typography>
          <ChevronDownIcon width={20} strokeWidth={1.5} className={arrowClassNames} />
        </div>
        <div className="mt-12 flex justify-between pr-20">
          {!open && (
            <div className="flex w-[70%] items-center">
              {lineItemOrderSummary?.map((lineItem) => (
                <div key={lineItem?.lineItemId} className="pr-16">
                  {lineItem?.variant?.images?.[0] && (
                    <div key={lineItem?.lineItemId} className="relative mr-12 h-[104px] w-[88px] shrink-0">
                      <Image layout="fill" src={lineItem.variant.images[0]} objectFit="contain" alt={lineItem.name} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center">
            {hiddenItemsCount > 0 && !open && (
              <Typography fontSize={16} className="mr-8 whitespace-nowrap text-secondary-black">
                {`+ ${hiddenItemsCount}`}
              </Typography>
            )}
          </div>
        </div>
      </div>
    );
  }, [open, arrowClassNames, formatOrdersMessage, hiddenItemsCount, lineItemOrderSummary]);

  return (
    <div className="ml-44 hidden h-fit w-[42%] rounded-md border p-36 2xl:block 3xl:w-[37%]">
      {lineItems.length === 1 ? (
        <div className="grid w-full grid-cols-1">
          <div className="border-b pb-16">
            <Typography fontSize={16} className="text-secondary-black">
              {formatOrdersMessage({
                id: 'your.order',
                defaultMessage: 'Your Order',
              })}
            </Typography>
          </div>
          <div className="flex justify-start border-b py-16">
            {lineItems[0].variant?.images?.[0] && (
              <div className="relative h-[104px] w-[88px] shrink-0">
                <Image layout="fill" src={lineItems[0].variant.images[0]} objectFit="contain" alt={lineItems[0].name} />
              </div>
            )}
            <div className="flex flex-col justify-center pl-16">
              <Typography fontSize={14} className="uppercase text-primary-black">
                {lineItems[0].name}
              </Typography>
              <Typography fontSize={14} medium className="mt-8 text-primary-black">
                {CurrencyHelpers.formatForCurrency(lineItems[0].price as number, locale)}
              </Typography>
              <Typography fontSize={14} className="mt-8 text-primary-black">
                {`x ${lineItems[0].count}`}
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <Accordion
          customClosedButton={orderSummaryAccordion}
          className={accordionClassNames}
          buttonWrapperClassName="w-full"
          buttonClassName="w-full"
          onClick={() => setOpen(!open)}
        >
          <div className="grid w-full grid-cols-1">
            {lineItems.map((lineItem) => (
              <div key={lineItem.lineItemId} className="flex justify-start border-b py-16">
                {lineItem.variant?.images?.[0] && (
                  <div className="relative h-[104px] w-[88px] shrink-0">
                    <Image layout="fill" src={lineItem.variant.images[0]} objectFit="contain" alt={lineItem.name} />
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
        </Accordion>
      )}

      <div className="flex flex-col gap-20 border-b pt-32 pb-20">
        <div className="flex justify-between">
          <Typography fontSize={16} className="text-secondary-black">
            {formatOrdersMessage({
              id: 'subtotal',
              defaultMessage: 'Subtotal',
            })}
          </Typography>

          <Typography fontSize={16} className="text-secondary-black">
            {subtotal}
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
            {shipmentFees}
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
            {totalTax}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-20 pt-12">
        <div className="flex justify-between">
          <Typography fontSize={18} medium className="text-secondary-black">
            {formatOrdersMessage({
              id: 'total',
              defaultMessage: 'Total',
            })}
          </Typography>
          <Typography fontSize={18} medium className="text-secondary-black">
            {total}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
