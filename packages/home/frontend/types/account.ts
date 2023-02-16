import { Account as BaseAccount } from '@commercetools/frontend-domain-types/account/Account';
import { Address as BaseAddress } from '@commercetools/frontend-domain-types/account/Address';

export interface Address extends BaseAddress {
  isShippingAddress?: boolean;
  isBillingAddress?: boolean;
}

export interface Account extends BaseAccount {
  isSubscribed?: boolean;
  addresses?: Address[];
}
