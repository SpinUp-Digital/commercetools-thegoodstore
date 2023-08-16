import { FC } from 'react';
import { useRouter } from 'next/router';
import { LineItem } from 'shared/types/cart/LineItem';
import Typography from 'components/commercetools-ui/atoms/typography';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import Image from 'frontastic/lib/image';

type OrderItemProps = {
  lineItem: LineItem;
};

const OrderItem: FC<OrderItemProps> = ({ lineItem }) => {
  const { locale } = useRouter();

  return (
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
  );
};

export default OrderItem;
