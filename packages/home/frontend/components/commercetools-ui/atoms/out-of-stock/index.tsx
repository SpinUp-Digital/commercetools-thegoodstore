import React from 'react';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';

interface Props {
  restockableInDays?: number;
  className?: string;
}

const OutOfStock: React.FC<Props> = ({ restockableInDays, className }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const classNames = useClassNames([
    'flex h-[25px] w-fit items-center justify-center py-4 px-8 text-12',
    restockableInDays ? 'bg-yellow-100' : 'bg-red-500 text-white',
    className,
  ]);

  return (
    <span className={classNames}>
      {restockableInDays
        ? formatProductMessage({
            id: 'available.in.days',
            defaultMessage: 'Available in {days} days',
            values: { days: restockableInDays },
          })
        : formatProductMessage({
            id: 'sold.out',
            defaultMessage: 'Sold out',
          })}
    </span>
  );
};

export default OutOfStock;
