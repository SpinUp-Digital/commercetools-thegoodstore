import { FC } from 'react';
import { useFormat } from 'helpers/hooks/useFormat';
import { Account } from 'types/account';
import InfoCard from '../../../account-atoms/info-card';

interface PersonalInformation {
  account: Account;
}

const PersonalInfo: FC<PersonalInformation> = ({ account }) => {
  const { formatMessage } = useFormat({ name: 'common' });

  const personalInformationFields: Array<{ label: string; value: string }> = [
    { label: formatMessage({ id: 'firstName', defaultMessage: 'First Name' }), value: account?.firstName as string },
    { label: formatMessage({ id: 'lastName', defaultMessage: 'Last Name' }), value: account?.lastName as string },
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
