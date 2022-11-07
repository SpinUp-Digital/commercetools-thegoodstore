import { Address } from "@commercetools/domain-types/account/Address";
declare type LoginAccountPayload = {
    email: string;
    password: string;
    remember?: boolean;
};
declare type RegisterAccountPayload = {
    account: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        salutation?: string;
        birthdayYear?: number;
        birthdayMonth?: number;
        birthdayDay?: number;
        billingAddress?: Address;
        shippingAddress?: Address;
    };
};
declare type ConfirmAccountPayload = {
    token: string;
};
declare type RequestAccountConfirmationEmailPayload = {
    email: string;
    password: string;
};
declare type ChangeAccountPasswordPayload = {
    oldPassword: string;
    newPassword: string;
};
declare type RequestAccountPasswordResetPayload = {
    email: string;
};
declare type ResetAccountPasswordPayload = {
    token: string;
    newPassword: string;
};
declare type UpdateAccountPayload = {
    firstName?: string;
    lastName?: string;
    salutation?: string;
    birthdayYear?: number;
    birthdayMonth?: number;
    birthdayDay?: number;
};
declare type AddAccountAddressPayload = {
    address: Omit<Address, "addressId">;
};
declare type UpdateAccountAddressPayload = {
    address: Address;
};
declare type RemoveAccountAddressPayload = {
    addressId: string;
};
declare type SetDefaultAccountBillingAddressPayload = {
    addressId: string;
};
declare type SetDefaultAccountShippingAddressPayload = {
    addressId: string;
};
export { LoginAccountPayload, RegisterAccountPayload, ConfirmAccountPayload, RequestAccountConfirmationEmailPayload, ChangeAccountPasswordPayload, RequestAccountPasswordResetPayload, ResetAccountPasswordPayload, UpdateAccountPayload, AddAccountAddressPayload, UpdateAccountAddressPayload, RemoveAccountAddressPayload, SetDefaultAccountBillingAddressPayload, SetDefaultAccountShippingAddressPayload, };
