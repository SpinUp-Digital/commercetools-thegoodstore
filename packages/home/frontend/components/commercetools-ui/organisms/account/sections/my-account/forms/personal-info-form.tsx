import { useState } from 'react';
import Input, { InputProps } from 'components/commercetools-ui/atoms/input';
import useFeedbackToasts from 'components/commercetools-ui/organisms/account/hooks/useFeedbackToasts';
import { useFormat } from 'helpers/hooks/useFormat';
import useValidate from 'helpers/hooks/useValidate';
import { Account } from 'types/account';
import { useAccount } from 'frontastic';
import AccountForm from '../../../account-atoms/account-form';
import useDiscardForm from '../../../hooks/useDiscardForm';

const PersonalInfoForm = () => {
  const { account, update } = useAccount();
  const { discardForm } = useDiscardForm();
  const [data, setData] = useState<Account>(account as Account);
  const [loading, setLoading] = useState(false);

  const { validateEmail, validateTextExists } = useValidate();
  const { notifyDataUpdated, notifyWentWrong } = useFeedbackToasts();

  const { formatMessage: formatErrorMessage } = useFormat({ name: 'error' });
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });

  const invalidNameErrorMessage = formatErrorMessage({
    id: 'name',
    defaultMessage: 'Name has to be at least two characters.',
  });
  const invalidEmailErrorMessage = formatErrorMessage({ id: 'email', defaultMessage: 'Email is not valid.' });

  //input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    update(data)
      .then(() => notifyDataUpdated())
      .catch(() => notifyWentWrong())
      .finally(() => setLoading(false));

    discardForm();
  };

  const inputFields: Array<InputProps> = [
    { label: 'Name', name: 'firstName', errorMessage: invalidNameErrorMessage, validation: validateTextExists },
    { label: 'Email', name: 'email', errorMessage: invalidEmailErrorMessage, validation: validateEmail },
  ];

  return (
    <AccountForm
      title={formatAccountMessage({ id: 'personal.info.edit', defaultMessage: 'Edit personal information' })}
      requiredLabelIsVisible
      defaultCTASection
      loading={loading}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-12">
        {inputFields.map((fieldProps, index) => (
          <Input
            key={index}
            {...fieldProps}
            onChange={handleChange}
            value={data?.[fieldProps.name as 'firstName' | 'email'] ?? ''}
            required
          />
        ))}
      </div>
    </AccountForm>
  );
};

export default PersonalInfoForm;
