import { Wishlist } from "@commercetools/domain-types/wishlist/Wishlist";
import { AddToWishlistPayload, RemoveFromWishlistPayload, UpdateWishlistItemPayload } from "../payloads/WishlistPayloads";
declare type GetWishlistAction = () => Promise<Wishlist>;
declare type AddToWishlistAction = (payload: AddToWishlistPayload) => Promise<Wishlist>;
declare type RemoveFromWishlistAction = (payload: RemoveFromWishlistPayload) => Promise<Wishlist>;
declare type UpdateWishlistItemAction = (payload: UpdateWishlistItemPayload) => Promise<Wishlist>;
export { GetWishlistAction, AddToWishlistAction, RemoveFromWishlistAction, UpdateWishlistItemAction, };
