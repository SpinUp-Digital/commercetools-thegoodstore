import React from 'react';
import { Account } from '@commercetools/frontend-domain-types/account/Account';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import { useAccount } from 'frontastic';
import Integrity from './sections/integrity';
import Newsletter from './sections/newsletter';
import PersonalInfo from './sections/personal-info';

const MyAccount = () => {
  const { account } = useAccount();

  const { formatMessage } = useFormat({ name: 'account' });

  return (
    <div>
      {/* Title and subtitle */}
      <div className="mb-32 grid gap-20 md:mb-42 lg:mb-56 lg:gap-24">
        <Typography as="h3" fontFamily="libre" fontSize={20} className="hidden text-primary-black md:block lg:text-24">
          {`${formatMessage({ id: 'hello', defaultMessage: 'Hi, ' })}${account?.firstName ?? ''}`}
        </Typography>
        <Typography as="h3" fontFamily="libre" fontSize={18} className="hidden text-primary-black md:block">
          {formatMessage({ id: 'my.account', defaultMessage: 'My Account' })}
        </Typography>
        <Typography fontSize={14} className="text-secondary-black md:text-16">
          {formatMessage({ id: 'account.desc', defaultMessage: 'Manage your account and subscriptions.' })}
        </Typography>
      </div>

      {/* Sections */}
      <div className="grid gap-32 md:gap-24 lg:gap-48">
        <PersonalInfo account={account as Account} />

        <Newsletter />

        <Integrity />
      </div>
    </div>
  );
};

export default MyAccount;
