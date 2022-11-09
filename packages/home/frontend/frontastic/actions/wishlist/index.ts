import useSWR, { mutate } from 'swr';
import { fetchApiHub, revalidateOptions } from 'frontastic';
import { SDK } from 'sdk';

export const getWishlist = () => {
  const extensions = SDK.getExtensions();

  return useSWR('/action/wishlist/getWishlist', extensions.getWishlist, revalidateOptions);
};

export const addToWishlist = async (sku: string, count = 1) => {
  const extensions = SDK.getExtensions();

  const res = await extensions.addToWishlist({ variant: { sku }, count });
  mutate('/action/wishlist/getWishlist', res);
};

export const removeLineItem = async (lineItemId: string) => {
  const extensions = SDK.getExtensions();

  const res = await extensions.removeFromWishlist({ lineItem: { id: lineItemId } });
  mutate('/action/wishlist/getWishlist', res);
};

export const updateLineItem = async (lineItemId: string, count = 1) => {
  const extensions = SDK.getExtensions();

  const res = await extensions.updateWishlistItem({ lineItem: { id: lineItemId }, count });
  mutate('/action/wishlist/getWishlist', res);
};
