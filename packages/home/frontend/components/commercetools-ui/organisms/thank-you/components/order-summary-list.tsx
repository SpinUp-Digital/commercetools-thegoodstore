import { FC } from 'react';
import { useRouter } from 'next/router';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { Order } from 'types/order';
import Image from 'frontastic/lib/image';

type OrderSummaryListProps = {
  className?: string;
  order: Order;
};

const OrderSummaryList: FC<OrderSummaryListProps> = ({ className, order }) => {
  const { locale } = useRouter();

  return (
    <div className={className}>
      {order?.lineItems?.map((lineItem) => (
        <div key={lineItem.lineItemId} className="flex items-center justify-between">
          <div className="flex items-start gap-16 py-16 md:gap-32">
            <div className="relative h-[104px] w-[89px] shrink-0">
              <Image layout="fill" src={lineItem.variant?.images?.[0]} objectFit="contain" />
            </div>
            <div className="mt-10 grow overflow-hidden">
              <span className="block max-w-[100%] truncate text-12 capitalize md:text-14">{lineItem.name}</span>
              <span className="mt-8 block text-12 font-medium md:hidden lg:block lg:text-14">
                {CurrencyHelpers.formatForCurrency(lineItem.price ?? {}, locale)}
              </span>
              <span className="mt-12 block text-14 text-secondary-black">x {lineItem.count}</span>
            </div>
          </div>
          <span className="mt-8 hidden text-16 font-medium md:block lg:hidden">
            {CurrencyHelpers.formatForCurrency(lineItem.price ?? {}, locale)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrderSummaryList;
