import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

type Props = {
  className?: string;
  totalCartItems?: number;
};

const Icon: React.FC<Props> = ({ className, totalCartItems }: Props) => (
  <>
    {totalCartItems > 0 && (
      <>
        <span className="absolute top-[-4px] right-[-3px] h-8 w-8 rounded-full bg-green-500" />
        <span className="absolute top-17 left-1/2 -translate-y-1/2 -translate-x-1/2 text-10">{totalCartItems}</span>
      </>
    )}
    <ShoppingBagIcon className={className} />
  </>
);

export default Icon;
