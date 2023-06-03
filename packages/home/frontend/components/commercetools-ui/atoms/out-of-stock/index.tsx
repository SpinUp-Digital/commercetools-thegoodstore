import React, { useMemo } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';
import useDates from 'helpers/hooks/useDates';
import { useFormat } from 'helpers/hooks/useFormat';
import useInventory from 'helpers/hooks/useInventory';
import { Variant } from 'types/product';

interface Props {
  variant?: Variant;
  className?: string;
}

const OutOfStock: React.FC<React.PropsWithChildren<Props>> = ({ variant, className }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const inventory = useInventory({ sku: variant?.sku ?? '' });

  const { representDateDiff } = useDates();

  const restockable = useMemo(() => {
    if (!inventory?.expectedDelivery) return '';
    return representDateDiff(new Date(), new Date(inventory.expectedDelivery));
  }, [inventory, representDateDiff]);

  const classNames = useClassNames([
    'flex h-[25px] w-fit items-center justify-center py-4 px-8 text-12',
    restockable ? 'bg-yellow-100' : 'bg-red-500 text-white',
    className,
  ]);

  return (
    <span className={classNames}>
      {restockable
        ? `${formatProductMessage({
            id: 'available.in',
            defaultMessage: 'Available in',
          })} ${restockable}`
        : formatProductMessage({
            id: 'sold.out',
            defaultMessage: 'Sold out',
          })}
    </span>
  );
};

export default OutOfStock;
