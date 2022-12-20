import { LineItem } from '@commercetools/frontend-domain-types/wishlist/LineItem';
import { Wishlist } from '@commercetools/frontend-domain-types/wishlist/Wishlist';

export interface UseWishlist {
  data?: Wishlist;
  totalItems: number;
  addToWishlist: (wishlist: Wishlist, lineItem: LineItem, count?: number) => Promise<void>;
  removeLineItem: (wishlist: Wishlist, lineItem: LineItem) => Promise<void>;
  clearWishlist: (wishlist: Wishlist) => Promise<void>;
  updateLineItem: (wishlist: Wishlist, lineItem: LineItem, count?: number) => Promise<void>;
}
