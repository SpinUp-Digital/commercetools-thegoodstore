import Button from 'components/commercetools-ui/atoms/button';
import PasswordInput from 'components/commercetools-ui/atoms/password-input';
import { useFormat } from 'helpers/hooks/useFormat';
import AccountForm from '../atoms/account-form';
import useDiscardForm from '../useDiscardForm';

const DeleteAccountForm = () => {
  const { discardForm } = useDiscardForm();
  const { formatMessage: formatCommonMessage } = useFormat({ name: 'common' });
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  return (
    <AccountForm
      title={formatAccountMessage({ id: 'delete.your.account', defaultMessage: 'Delete your account' })}
      subtitle={formatAccountMessage({
        id: 'delete.disclosure',
        defaultMessage:
          "By deleting your account your personal data will be removed. You can't regain access once it's deleted.",
      })}
      onSubmit={discardForm}
    >
      <div className="md:max-w-[276px]">
        <PasswordInput label="Password confirmation" required />

        <div className="mt-32 grid grid-cols-2 gap-12">
          <Button
            type="button"
            variant="secondary"
            className="h-40 w-full rounded-md border border-primary-black p-0"
            onClick={discardForm}
          >
            {formatCommonMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
          </Button>
          <Button type="submit" className="h-40 w-full bg-accent-red px-0 text-14">
            {formatAccountMessage({ id: 'delete.account', defaultMessage: 'Delete account' })}
          </Button>
        </div>
      </div>
    </AccountForm>
  );
};

export default DeleteAccountForm;
