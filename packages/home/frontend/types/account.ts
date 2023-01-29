import { Account as BaseAccount } from '@commercetools/frontend-domain-types/account/Account';

export interface Account extends BaseAccount {
  isSubscribed?: boolean;
}
