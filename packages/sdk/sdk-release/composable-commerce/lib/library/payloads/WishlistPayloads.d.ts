declare type AddToWishlistPayload = {
    variant: {
        sku: string;
    };
    count: number;
};
declare type RemoveFromWishlistPayload = {
    lineItem: {
        id: string;
    };
};
declare type UpdateWishlistItemPayload = {
    lineItem: {
        id: string;
    };
    count: number;
};
export { AddToWishlistPayload, RemoveFromWishlistPayload, UpdateWishlistItemPayload };
