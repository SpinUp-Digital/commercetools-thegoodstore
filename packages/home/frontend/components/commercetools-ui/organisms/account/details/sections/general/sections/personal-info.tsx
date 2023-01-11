import { FC } from 'react';
import { Account } from '@commercetools/frontend-domain-types/account/Account';
import { useFormat } from 'helpers/hooks/useFormat';
import InfoCard from '../../../../account-atoms/info-card';

interface PersonalInformation {
  account: Account;
}

const PersonalInfo: FC<PersonalInformation> = ({ account }) => {
  const { formatMessage } = useFormat({ name: 'common' });

  const personalInformationFields: Array<{ label: string; value: string }> = [
    { label: formatMessage({ id: 'name', defaultMessage: 'Name' }), value: account?.firstName as string },
    { label: formatMessage({ id: 'email', defaultMessage: 'Email' }), value: account?.email },
  ];

  return (
    <InfoCard
      title={formatMessage({ id: 'personal.info', defaultMessage: 'Personal information' })}
      isEditable
      infoFields={personalInformationFields}
      editHref="#edit-personal-info"
    />
  );
};

export default PersonalInfo;
