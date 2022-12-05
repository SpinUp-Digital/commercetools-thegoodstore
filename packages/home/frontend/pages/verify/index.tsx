import React, { useCallback, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Account } from '@commercetools/domain-types/account/Account';
import Toast from 'react-hot-toast';
import { useFormat } from 'helpers/hooks/useFormat';
import { useAccount } from 'frontastic';

const Verify: NextPage = () => {
  //i18n messages
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });

  //next/router
  const router = useRouter();

  //verification token
  const { token } = router.query;

  //account actions
  const { confirm } = useAccount();

  //error callback because of invalid token
  const errorCallback = useCallback(() => {
    Toast.error(formatAccountMessage({ id: 'verification.failed', defaultMessage: 'Invalid token' }));
  }, [formatAccountMessage, router]);

  //successful callback after verification
  const successCallback = useCallback(
    (account: Account) => {
      if (account.accountId)
        Toast.success(formatAccountMessage({ id: 'verification.done', defaultMessage: 'Email verified' }));
      else errorCallback();
    },
    [formatAccountMessage, router, errorCallback],
  );

  //done callback after either success or failure
  const doneCallback = useCallback(() => {
    router.replace('/account', undefined, { shallow: true });
  }, [router]);

  //Confirmed flag to prevent multiple requests
  const confirmed = useRef(false);

  //verify user's email
  const verifyUser = useCallback(async () => {
    if (!token || confirmed.current) return;

    confirmed.current = true;

    router.push('/account?verify=1');

    confirm(token as string)
      .then(successCallback)
      .catch(errorCallback)
      .finally(doneCallback);
  }, [token, confirm, successCallback, errorCallback, doneCallback]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return <></>;
};

export default Verify;
