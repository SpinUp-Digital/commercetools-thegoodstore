import React from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import { useFormat } from 'helpers/hooks/useFormat';

const LoggedOut = () => {
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });

  return (
    <div className="w-[235px] p-14">
      <Button className="w-full py-12 text-16 leading-[16px]">
        {formatAccountMessage({ id: 'sign.in', defaultMessage: 'Sign in' })}
      </Button>
      <Link link="#" className="mt-20 block">
        {formatAccountMessage({ id: 'membership.info', defaultMessage: 'Membership info' })}
      </Link>
      <span className="mt-32 block">
        {formatAccountMessage({ id: 'not.member', defaultMessage: 'Not a member' })}?{' '}
        <Link link="#" className="font-bold">
          {formatAccountMessage({ id: 'join.here', defaultMessage: 'Join here' })}
        </Link>
      </span>
    </div>
  );
};

export default LoggedOut;
