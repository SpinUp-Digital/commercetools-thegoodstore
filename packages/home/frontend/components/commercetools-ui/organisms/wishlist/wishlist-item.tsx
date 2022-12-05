import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { LineItem } from '@commercetools/domain-types/wishlist/LineItem';
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart, useWishlist } from 'frontastic';
import Image from 'frontastic/lib/image';

export interface Props {
  item: LineItem;
}

const WishlistItem: FC<Props> = ({ item }) => {
  const { locale } = useRouter();

  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });
  const { data: wishlist, removeLineItem } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = () => {
    removeLineItem(wishlist, item);
    addItem(item.variant, 1);
  };

  return (
    <div className="flex max-w-full items-stretch justify-start gap-10 py-18 md:gap-15">
      <div className="h-[145px] w-[125px] shrink-0 bg-white p-12">
        <div className="relative h-full w-full">
          <Image src={item.variant?.images?.[0]} suffix="small" objectFit="contain" />
        </div>
      </div>
      <div className="grow">
        <div className="flex max-w-full items-center justify-between">
          <p className="max-w-[150px] overflow-hidden text-ellipsis whitespace-pre text-14 uppercase leading-loose">
            {item.name}
          </p>
          <i onClick={() => removeLineItem(wishlist, item)} className="block cursor-pointer">
            <TrashIcon stroke="#494949" className="w-20" />
          </i>
        </div>
        <div className="mt-12">
          {item.variant.discountedPrice ? (
            <div className="flex items-center gap-5">
              <span className="text-14 font-medium leading-loose text-accent-red">
                {CurrencyHelpers.formatForCurrency(item.variant.discountedPrice, locale)}
              </span>
              <span className="text-12 font-normal leading-loose text-gray-500 line-through">
                {CurrencyHelpers.formatForCurrency(item.variant.price, locale)}
              </span>
            </div>
          ) : (
            <span className="text-14 font-medium leading-loose">
              {CurrencyHelpers.formatForCurrency(item.variant.price, locale)}
            </span>
          )}
        </div>
        <div className="mt-16 leading-normal">
          <Button variant="primary" onClick={moveToCart} className="py-8 text-14">
            {formatWishlistMessage({ id: 'wishlist.add.to.cart', defaultMessage: 'Add to cart' })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
