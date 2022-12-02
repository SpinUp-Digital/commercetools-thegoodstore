import { LineItem } from '@commercetools/domain-types/wishlist/LineItem';
import { Wishlist } from '@commercetools/domain-types/wishlist/Wishlist';

export interface UseWishlist {
  data?: Wishlist;
  totalItems: number;
  addToWishlist: (wishlist: Wishlist, lineItem: LineItem, count?: number) => Promise<void>;
  removeLineItem: (wishlist: Wishlist, lineItem: LineItem) => Promise<void>;
  clearWishlist: (wishlist: Wishlist) => Promise<void>;
  updateLineItem: (wishlist: Wishlist, lineItem: LineItem, count?: number) => Promise<void>;
}
