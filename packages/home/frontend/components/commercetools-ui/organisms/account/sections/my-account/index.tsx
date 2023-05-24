import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import { Account } from 'types/account';
import { useAccount } from 'frontastic';
import Integrity from './sections/integrity';
import Newsletter from './sections/newsletter';
import PersonalInfo from './sections/personal-info';

interface Props {
  isLoading?: boolean;
}

const MyAccount: React.FC<Props> = ({ isLoading }) => {
  const { account } = useAccount();

  const { formatMessage } = useFormat({ name: 'account' });

  return (
    <div className="mt-20 px-16 md:px-24 lg:mt-42 lg:px-44">
      {/* Title and subtitle */}
      <div className="mb-32 grid gap-20 md:mb-42 lg:mb-56 lg:gap-24">
        {isLoading ? (
          <Skeleton className="h-[30px] max-w-[300px]" />
        ) : (
          <Typography
            as="h3"
            fontFamily="libre"
            fontSize={20}
            className="hidden text-primary-black md:block lg:text-24"
          >
            {`${formatMessage({ id: 'hello', defaultMessage: 'Hi, ' })}${account?.firstName ?? ''}`}
          </Typography>
        )}
        {isLoading ? (
          <Skeleton className="max-w-[400px]" />
        ) : (
          <Typography fontSize={14} className="text-secondary-black md:text-16">
            {formatMessage({ id: 'account.desc', defaultMessage: 'Manage your account and subscriptions.' })}
          </Typography>
        )}
      </div>

      {/* Sections */}
      <div className="grid gap-32 md:gap-24 lg:gap-48">
        {isLoading ? (
          <Skeleton className="h-[350px]" />
        ) : (
          <>
            <PersonalInfo account={account as Account} />

            <Newsletter />

            <Integrity />
          </>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
