import { FC } from 'react';
import { useRouter } from 'next/router';
import { LineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import Skeleton from 'react-loading-skeleton';
import Typography from 'components/commercetools-ui/atoms/typography';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import Image from 'frontastic/lib/image';

const OrderLineItem: FC<LineItem> = ({ name, price, count, variant }) => {
  const { locale } = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-16 py-16 md:gap-32">
        <div className="relative h-[104px] w-[89px] shrink-0">
          {variant?.images?.[0] ? (
            <Image layout="fill" src={variant?.images?.[0]} objectFit="contain" />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>
        <div className="mt-10 grow overflow-hidden">
          <Typography asSkeleton={!name} fontSize={12} className="block max-w-[100%] truncate capitalize md:text-14">
            {name ?? 'product name'}
          </Typography>
          <Typography asSkeleton={!name} fontSize={12} medium className="mt-8 block md:hidden lg:block lg:text-14">
            {CurrencyHelpers.formatForCurrency(price ?? 111, locale)}
          </Typography>
          <Typography asSkeleton={!name} fontSize={14} className="mt-12 text-secondary-black">
            {'x ' + count ?? '2'}
          </Typography>
        </div>
      </div>
      <Typography asSkeleton={!name} fontSize={16} medium className="mt-8 hidden md:block lg:hidden">
        {CurrencyHelpers.formatForCurrency(price ?? 111, locale)}
      </Typography>
    </div>
  );
};

export default OrderLineItem;
