/* eslint-disable react-hooks/rules-of-hooks*/

import { LineItem } from '@commercetools/frontend-domain-types/wishlist/LineItem';
import { Wishlist } from '@commercetools/frontend-domain-types/wishlist/Wishlist';
import useSWR, { mutate } from 'swr';
import { SDK, sdk } from 'sdk';
import { revalidateOptions } from 'frontastic';

export const getWishlist = () => {
  const extensions = SDK.getExtensions();

  const result = useSWR('/action/wishlist/getWishlist', extensions.wishlist.getWishlist, revalidateOptions);

  if (result.data?.isError) return result as { data?: Wishlist };

  return { ...result, data: result.data?.data };
};

export const addToWishlist = async (wishlist: Wishlist, lineItem: LineItem, count = 1) => {
  const extensions = SDK.getExtensions();

  const newWishlist = { ...wishlist, lineItems: [...(wishlist.lineItems ?? []), lineItem] };

  const res = extensions.wishlist.addItem({ variant: { sku: lineItem.variant?.sku as string }, count });

  await mutate('/action/wishlist/getWishlist', res, {
    optimisticData: { data: newWishlist },
    rollbackOnError: true,
  });
};

export const removeLineItem = async (wishlist: Wishlist, lineItem: LineItem) => {
  const extensions = SDK.getExtensions();

  const newWishlist = {
    ...wishlist,
    lineItems: wishlist.lineItems?.filter((item) => item.lineItemId !== lineItem.lineItemId) ?? [],
  };

  const res = extensions.wishlist.removeItem({ lineItem: { id: lineItem.lineItemId } });
  await mutate('/action/wishlist/getWishlist', res, {
    optimisticData: { data: newWishlist },
    rollbackOnError: true,
  });
};

export const clearWishlist = async (wishlist: Wishlist) => {
  const res = await sdk.callAction({ actionName: 'wishlist/clearWishlist' });
  const newWishlist = {
    ...wishlist,
    lineItems: [],
  };

  if (!res.isError) {
    await mutate('/action/wishlist/getWishlist', res.data, {
      optimisticData: { data: newWishlist },
      rollbackOnError: true,
    });
  }
};

export const updateLineItem = async (wishlist: Wishlist, lineItem: LineItem, count = 1) => {
  const extensions = SDK.getExtensions();

  const newWishlist = {
    ...wishlist,
    lineItems:
      wishlist.lineItems?.map((item) => {
        if (item.lineItemId === lineItem.lineItemId) {
          return { ...lineItem, count: ++count };
        }
      }) ?? [],
  };

  const res = await extensions.wishlist.updateItem({ lineItem: { id: lineItem.lineItemId }, count });

  if (!res.isError) {
    await mutate('/action/wishlist/getWishlist', res.data, {
      optimisticData: newWishlist,
      rollbackOnError: true,
    });
  }
};
