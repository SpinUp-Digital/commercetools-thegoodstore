/* eslint-disable react-hooks/rules-of-hooks*/

import { Account } from '@commercetools/frontend-domain-types/account/Account';
import { Address } from '@commercetools/frontend-domain-types/account/Address';
import { sdk } from '@commercetools/frontend-sdk';
import useSWR, { mutate } from 'swr';
import { SDK } from 'sdk';
import { revalidateOptions } from 'frontastic';
import { ResponseError } from 'frontastic/lib/fetch-api-hub';

export interface GetAccountResult {
  loggedIn: boolean;
  account?: Account;
  error?: ResponseError;
}

export interface UpdateAccount {
  firstName?: string;
  lastName?: string;
  salutation?: string;
  birthdayYear?: number;
  birthdayMonth?: number;
  birthdayDay?: number;
}

export interface RegisterAccount extends UpdateAccount {
  email: string;
  password: string;
  billingAddress?: Address;
  shippingAddress?: Address;
}

export const getAccount = (): GetAccountResult => {
  const extensions = SDK.getExtensions();

  const result = useSWR('/action/account/getAccount', extensions.account.getAccount, revalidateOptions);

  if (result.data?.isError) return { loggedIn: false, error: result.error };

  const account = (result.data?.data as GetAccountResult)?.account as Account;

  if (account?.accountId) return { account, loggedIn: true };

  return {
    loggedIn: false,
    account: undefined,
    error: result.error,
  };
};

export const login = async (email: string, password: string, remember?: boolean): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const payload = {
    email,
    password,
    remember,
  };

  const res = await extensions.account.login(payload);

  mutate('/action/account/getAccount', res);
  mutate('/action/cart/getCart');
  mutate('/action/wishlist/getWishlist');

  return res.isError ? ({} as Account) : res.data;
};

export const logout = async () => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.logout();

  mutate('/action/account/getAccount', res);
  mutate('/action/cart/getCart');
  mutate('/action/wishlist/getWishlist');
};

export const register = async (account: RegisterAccount): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.register({ account: account });

  return res.isError ? ({} as Account) : res.data;
};

export const confirm = async (token: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.confirm({ token });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const requestConfirmationEmail = async (email: string, password: string): Promise<void> => {
  const extensions = SDK.getExtensions();

  const payload = {
    email,
    password,
  };

  await extensions.account.requestConfirmationEmail(payload);
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.changePassword({ oldPassword, newPassword });

  return res.isError ? ({} as Account) : res.data;
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  const extensions = SDK.getExtensions();

  const payload = {
    email,
  };

  await extensions.account.requestResetPassword(payload);
};

export const resetPassword = async (token: string, newPassword: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.resetPassword({ token, newPassword });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const update = async (account: UpdateAccount): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.updateAccount(account);

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const addAddress = async (address: Omit<Address, 'addressId'>): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.addAddress({ address });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const addShippingAddress = async (address: Omit<Address, 'addressId'>): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const response = await extensions.account.getAccount();

  if (response.isError) return {} as Account;

  const res = await sdk.callAction<Account>({
    actionName: 'account/addShippingAddress',
    payload: { account: response.data.account, address },
  });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const addBillingAddress = async (address: Omit<Address, 'addressId'>): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const response = await extensions.account.getAccount();

  if (response.isError) return {} as Account;

  const res = await sdk.callAction<Account>({
    actionName: 'account/addBillingAddress',
    payload: { account: response.data.account, address },
  });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const updateAddress = async (address: Address): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.updateAddress({ address });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const removeAddress = async (addressId: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.removeAddress({ addressId });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const setDefaultBillingAddress = async (addressId: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.setDefaultBillingAddress({ addressId });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};

export const setDefaultShippingAddress = async (addressId: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.account.setDefaultShippingAddress({ addressId });

  mutate('/action/account/getAccount', res);

  return res.isError ? ({} as Account) : res.data;
};
