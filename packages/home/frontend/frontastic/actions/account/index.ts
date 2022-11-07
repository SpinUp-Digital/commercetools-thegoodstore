import useSWR, { mutate } from 'swr';
import { Account } from '@commercetools/domain-types/account/Account';
import { Address } from '@commercetools/domain-types/account/Address';
import { REMEMBER_ME } from 'helpers/constants/localStorage';
import { revalidateOptions } from 'frontastic';
import { fetchApiHub, getExtensions, ResponseError } from 'frontastic/lib/fetch-api-hub';

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
  const extensions = getExtensions();

  const result = useSWR<unknown>('/action/account/getAccount', extensions.getAccount, revalidateOptions);

  const account = (result.data as GetAccountResult)?.account || (result.data as Account);

  if (account?.accountId && account?.confirmed) return { account, loggedIn: true };

  return {
    loggedIn: false,
    account: undefined,
    error: result.error,
  };
};

export const login = async (email: string, password: string, remember?: boolean): Promise<Account> => {
  const extensions = getExtensions();

  const payload = {
    email,
    password,
  };
  if (remember) window.localStorage.setItem(REMEMBER_ME, '1');
  const res = await extensions.login(payload);
  await mutate('/action/account/getAccount', res);
  return res;
};

export const logout = async () => {
  const extensions = getExtensions();

  window.localStorage.removeItem(REMEMBER_ME);
  const res = await extensions.logout();
  await mutate('/action/account/getAccount', res);
};

export const register = async (account: RegisterAccount): Promise<Account> => {
  const extensions = getExtensions();

  const host = typeof window !== 'undefined' ? window.location.origin : '';
  const acc = { ...account, host };
  return await extensions.registerAccount({ account: acc });
};

export const confirm = async (token: string): Promise<Account> => {
  const extensions = getExtensions();

  const res = await extensions.confirmAccount({ token });
  await mutate('/action/account/getAccount', res);
  return res;
};

export const resendVerificationEmail = async (email: string, password: string): Promise<void> => {
  const extensions = getExtensions();

  const host = typeof window !== 'undefined' ? window.location.origin : '';

  const payload = {
    email,
    password,
    host,
  };
  const res = await extensions.requestAccountConfirmationEmail(payload);
  return res;
};

export const changePassword = async (token: string, newPassword: string): Promise<Account> => {
  const extensions = getExtensions();

  return await extensions.resetAccountPassword({ token, newPassword });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  const extensions = getExtensions();

  const host = typeof window !== 'undefined' ? window.location.origin : '';

  const payload = {
    email,
    host,
  };

  return await extensions.requestResetAccountPassword(payload);
};

export const resetPassword = async (token: string, newPassword: string): Promise<Account> => {
  const extensions = getExtensions();

  const res = await extensions.resetAccountPassword({ token, newPassword });
  await mutate('/action/account/getAccount', res);
  return res;
};

export const update = async (account: UpdateAccount): Promise<Account> => {
  const extensions = getExtensions();

  const res = await extensions.updateAccount(account);
  await mutate('/action/account/getAccount', res);
  return res;
};

export const addAddress = async (address: Omit<Address, 'addressId'>): Promise<Account> => {
  const extensions = getExtensions();

  const res = await extensions.addAccountAddress({ address });
  await mutate('/action/account/getAccount', res);
  return res;
};

export const updateAddress = async (address: Address): Promise<Account> => {
  const extensions = getExtensions();

  const res = await extensions.updateAccountAddress({ address });
  await mutate('/action/account/getAccount', res);
  return res;
};

export const removeAddress = async (addressId: string): Promise<Account> => {
  const extensions = getExtensions();

  const res = await extensions.removeAccountAddress({ addressId });
  await mutate('/action/account/getAccount', res);
  return res;
};

export const setDefaultBillingAddress = async (addressId: string): Promise<Account> => {
  const extensions = getExtensions();

  const res = await extensions.setDefaultBillingAddress({ addressId });
  await mutate('/action/account/getAccount', res);
  return res;
};

export const setDefaultShippingAddress = async (addressId: string): Promise<Account> => {
  const extensions = getExtensions();

  const res = await extensions.setDefaultShippingAddress({ addressId });
  await mutate('/action/account/getAccount', res);
  return res;
};
