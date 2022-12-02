import useSWR, { mutate } from 'swr';
import { Account } from '@commercetools/domain-types/account/Account';
import { Address } from '@commercetools/domain-types/account/Address';
import { REMEMBER_ME } from 'helpers/constants/localStorage';
import { revalidateOptions } from 'frontastic';
import { fetchApiHub, ResponseError } from 'frontastic/lib/fetch-api-hub';
import { SDK } from 'sdk';

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

  const result = useSWR<unknown>('/action/account/getAccount', fetchApiHub, revalidateOptions);

  const account = (result.data as GetAccountResult)?.account || (result.data as Account);

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

  const res = await extensions.login(payload);

  mutate('/action/account/getAccount', res);
  mutate('/action/cart/getCart');
  mutate('/action/wishlist/getWishlist');
  return res;
};

export const logout = async () => {
  const extensions = SDK.getExtensions();

  const res = await extensions.logout();

  mutate('/action/account/getAccount', res);
  mutate('/action/cart/getCart');
  mutate('/action/wishlist/getWishlist');
  return res;
};

export const register = async (account: RegisterAccount): Promise<Account> => {
  const extensions = SDK.getExtensions();

  return await extensions.registerAccount({ account: account });
};

export const confirm = async (token: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.confirmAccount({ token });
  mutate('/action/account/getAccount', res);
  return res;
};

export const requestConfirmationEmail = async (email: string, password: string): Promise<void> => {
  const extensions = SDK.getExtensions();

  const payload = {
    email,
    password,
  };
  return await extensions.requestAccountConfirmationEmail(payload);
};

export const changePassword = async (token: string, newPassword: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  return await extensions.resetAccountPassword({ token, newPassword });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  const extensions = SDK.getExtensions();

  const payload = {
    email,
  };

  return await extensions.requestResetAccountPassword(payload);
};

export const resetPassword = async (token: string, newPassword: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.resetAccountPassword({ token, newPassword });
  mutate('/action/account/getAccount', res);
  return res;
};

export const update = async (account: UpdateAccount): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.updateAccount(account);
  mutate('/action/account/getAccount', res);
  return res;
};

export const addAddress = async (address: Omit<Address, 'addressId'>): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.addAccountAddress({ address });
  mutate('/action/account/getAccount', res);
  return res;
};

export const updateAddress = async (address: Address): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.updateAccountAddress({ address });
  mutate('/action/account/getAccount', res);
  return res;
};

export const removeAddress = async (addressId: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.removeAccountAddress({ addressId });
  mutate('/action/account/getAccount', res);
  return res;
};

export const setDefaultBillingAddress = async (addressId: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.setDefaultBillingAddress({ addressId });
  mutate('/action/account/getAccount', res);
  return res;
};

export const setDefaultShippingAddress = async (addressId: string): Promise<Account> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.setDefaultShippingAddress({ addressId });
  mutate('/action/account/getAccount', res);
  return res;
};
