import React, { useCallback, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import { LineItem } from '@Types/cart/LineItem';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart, useWishlist } from 'frontastic';
import Image from 'frontastic/lib/image';

export interface Props {
  item: LineItem;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const { removeItem, updateItem } = useCart();

  const { addToWishlist, data } = useWishlist();

  const [processing, setProcessing] = useState(false);

  const counterClassName = useClassNames([
    'flex w-fit items-center gap-12 rounded-sm border border-neutral-300',
    processing ? 'cursor-not-allowed bg-neutral-300' : 'cursor-pointer bg-white',
  ]);

  const updateCartItem = useCallback(
    async (newQuantity: number) => {
      if (processing || newQuantity < 1) return;

      setProcessing(true);

      await updateItem(item.lineItemId, newQuantity);

      setProcessing(false);
    },
    [updateItem, processing, item],
  );

  const moveToWishlist = useCallback(() => {
    removeItem(item.lineItemId);
    addToWishlist(item.variant.sku, 1);
  }, [removeItem, addToWishlist]);

  return (
    <div className="gap:10 flex max-w-full items-stretch justify-start py-18 md:gap-15">
      <div className="w-[125px] shrink-0 bg-white p-12">
        <div className="relative h-full w-full">
          <Image src={item.variant?.images?.[0]} suffix="small" objectFit="contain" />
        </div>
      </div>
      <div className="grow">
        <div className="flex max-w-full items-center justify-between">
          <p className="max-w-[150px] overflow-hidden text-ellipsis whitespace-pre text-14 capitalize leading-loose">
            {item.name}
          </p>
          <i onClick={() => removeItem(item.lineItemId)} className="block h-15 w-15 cursor-pointer">
            <TrashIcon />
          </i>
        </div>
        <div className="mt-12">
          {item.discountedPrice ? (
            <div className="flex items-center gap-5">
              <span className="text-14 font-semibold leading-loose text-accent-red">
                {CurrencyHelpers.formatForCurrency(item.discountedPrice)}
              </span>
              <span className="text-14 font-semibold leading-loose text-gray-500 line-through">
                {CurrencyHelpers.formatForCurrency(item.price)}
              </span>
            </div>
          ) : (
            <span className="text-14 font-semibold leading-loose">{CurrencyHelpers.formatForCurrency(item.price)}</span>
          )}
        </div>
        <div className="mt-16">
          <div className={counterClassName}>
            <button onClick={() => updateCartItem(item.count - 1)} className="cursor-[inherit] py-8 pl-12">
              -
            </button>
            <span className="py-8 text-14">{item.count}</span>
            <button onClick={() => updateCartItem(item.count + 1)} className="cursor-[inherit] py-8 pr-12">
              +
            </button>
          </div>
        </div>
        <div className="mt-16 text-14 leading-normal">
          <p className="cursor-pointer text-secondary-black" onClick={moveToWishlist}>
            {formatCartMessage({ id: 'move.to.wishlist', defaultMessage: 'Move to wishlist' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
