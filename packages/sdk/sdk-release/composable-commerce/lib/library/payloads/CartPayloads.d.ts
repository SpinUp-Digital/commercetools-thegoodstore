import { Address } from "@commercetools/domain-types/account/Address";
declare type AddCartItemPayload = {
    variant: {
        sku: string;
        count: number;
    };
};
declare type RemoveCartItemPayload = {
    lineItem: {
        id: string;
    };
};
declare type UpdateCartItemPayload = {
    lineItem: {
        id: string;
        count: number;
    };
};
declare type UpdateCartPayload = {
    account?: {
        email: string;
    };
    shipping?: Address;
    billing?: Address;
};
declare type SetCartShippingMethodPayload = {
    shippingMethod: {
        id: string;
    };
};
declare type RedeemDiscountCodePayload = {
    code: string;
};
declare type RemoveDiscountCodePayload = {
    discountId: string;
};
export { AddCartItemPayload, RemoveCartItemPayload, UpdateCartItemPayload, UpdateCartPayload, SetCartShippingMethodPayload, RedeemDiscountCodePayload, RemoveDiscountCodePayload };
