import React from 'react';
import { useRouter } from 'next/router';
import { Money } from 'shared/types/product/Money';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import Typography from '../../../atoms/typography';

interface Props {
  discountedPrice?: Money;
  price?: Money;
}

const Prices: React.FC<Props> = ({ price, discountedPrice }) => {
  const { locale } = useRouter();

  return (
    <>
      {discountedPrice ? (
        <div className="flex items-center gap-8">
          <Typography as="h4" medium lineHeight="loose" fontSize={11} className="text-accent-red md:text-14">
            {CurrencyHelpers.formatForCurrency(discountedPrice, locale)}
          </Typography>
          <Typography as="h5" medium lineHeight="loose" fontSize={10} className="text-gray-500 line-through md:text-12">
            {CurrencyHelpers.formatForCurrency(price ?? '', locale)}
          </Typography>
        </div>
      ) : (
        <Typography as="h4" medium fontSize={11} lineHeight="loose" className="text-primary-black md:text-14">
          {CurrencyHelpers.formatForCurrency(price ?? '', locale)}
        </Typography>
      )}
    </>
  );
};

export default Prices;
