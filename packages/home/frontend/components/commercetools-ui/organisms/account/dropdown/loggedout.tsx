import React from 'react';
import { useRouter } from 'next/router';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import { useFormat } from 'helpers/hooks/useFormat';

const LoggedOut = () => {
  const router = useRouter();
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });

  const goToLoginPage = () => router.push('login');

  return (
    <div className="w-[235px] p-14">
      <Button variant="primary" className="w-full py-12 text-16 leading-[16px]" onClick={goToLoginPage}>
        {formatAccountMessage({ id: 'sign.in', defaultMessage: 'Sign in' })}
      </Button>
      <Link variant="menu-item" link="/" className="mt-20 block w-fit">
        {formatAccountMessage({ id: 'membership.info', defaultMessage: 'Membership info' })}
      </Link>
      <span className="mt-32 block">
        {formatAccountMessage({ id: 'not.member', defaultMessage: 'Not a member' })}?{' '}
        <Link variant="menu-item" link="/register" className="font-bold">
          {formatAccountMessage({ id: 'join.here', defaultMessage: 'Join here' })}
        </Link>
      </span>
    </div>
  );
};

export default LoggedOut;
