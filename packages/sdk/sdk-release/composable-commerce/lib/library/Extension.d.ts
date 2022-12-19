import { SDK, Extension } from "@commercetools/sdk";
import {
    AddAccountAddressAction,
    ChangeAccountPasswordAction,
    ConfirmAccountAction,
    GetAccountAction,
    LoginAccountAction,
    LogoutAccountAction,
    RegisterAccountAction,
    RemoveAccountAddressAction,
    RequestAccountConfirmationEmailAction,
    RequestAccountPasswordResetAction,
    ResetAccountPasswordAction,
    SetDefaultAccountShippingAddressAction,
    UpdateAccountAction,
    UpdateAccountAddressAction,
} from "./actions/AccountActions";
import {
    AddCartItemAction,
    CheckoutCartAction,
    GetAvailableCartShippingMethodsAction,
    GetCartAction,
    GetCartShippingMethodsAction,
    GetOrderHistoryAction,
    RedeemDiscountCodeAction,
    RemoveCartItemAction,
    RemoveDiscountCodeAction,
    SetCartShippingMethodAction,
    UpdateCartAction,
    UpdateCartItemAction,
} from "./actions/CartActions";
import {
    GetProductAction,
    ProductQueryAction,
    QueryProductCategoriesAction,
    GetSearchableProductAttributesAction,
} from "./actions/ProductActions";
import { GetProjectSettingsAction } from "./actions/ProjectActions";
import {
    AddToWishlistAction,
    GetWishlistAction,
    RemoveFromWishlistAction,
    UpdateWishlistItemAction,
} from "./actions/WishlistActions";
declare class ComposableCommerce extends Extension {
    constructor(sdk: SDK);
    unregisterExtension(): void;
    getProjectSettings: GetProjectSettingsAction;
    getProduct: GetProductAction;
    productQuery: ProductQueryAction;
    queryProductCategories: QueryProductCategoriesAction;
    getSearchableProductAttributes: GetSearchableProductAttributesAction;
    getCart: GetCartAction;
    addCartItem: AddCartItemAction;
    removeCartItem: RemoveCartItemAction;
    updateCartItem: UpdateCartItemAction;
    updateCart: UpdateCartAction;
    getShippingMethods: GetCartShippingMethodsAction;
    getAvailableShippingMethods: GetAvailableCartShippingMethodsAction;
    setShippingMethod: SetCartShippingMethodAction;
    redeemDiscountCode: RedeemDiscountCodeAction;
    removeDiscountCode: RemoveDiscountCodeAction;
    checkoutCart: CheckoutCartAction;
    getOrderHistory: GetOrderHistoryAction;
    getWishlist: GetWishlistAction;
    addToWishlist: AddToWishlistAction;
    removeFromWishlist: RemoveFromWishlistAction;
    updateWishlistItem: UpdateWishlistItemAction;
    getAccount: GetAccountAction;
    login: LoginAccountAction;
    logout: LogoutAccountAction;
    registerAccount: RegisterAccountAction;
    confirmAccount: ConfirmAccountAction;
    requestAccountConfirmationEmail: RequestAccountConfirmationEmailAction;
    changeAccountPassword: ChangeAccountPasswordAction;
    requestResetAccountPassword: RequestAccountPasswordResetAction;
    resetAccountPassword: ResetAccountPasswordAction;
    updateAccount: UpdateAccountAction;
    addAccountAddress: AddAccountAddressAction;
    updateAccountAddress: UpdateAccountAddressAction;
    removeAccountAddress: RemoveAccountAddressAction;
    setDefaultBillingAddress: SetDefaultAccountShippingAddressAction;
    setDefaultShippingAddress: SetDefaultAccountShippingAddressAction;
}
export { ComposableCommerce };
