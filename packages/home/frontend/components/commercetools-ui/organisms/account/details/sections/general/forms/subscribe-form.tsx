import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import AccountForm from '../atoms/account-form';
import useDiscardForm from '../useDiscardForm';

const SubscribeForm = () => {
  const { discardForm } = useDiscardForm();
  const { formatMessage } = useFormat({ name: 'account' });
  const values = ['subscribe', 'unsubscribe'];

  return (
    <AccountForm
      title={formatMessage({ id: 'subscribe.update', defaultMessage: 'Update Subscription' })}
      defaultCTASection
      onSubmit={discardForm}
    >
      <div className="mb-44 grid gap-24">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-12">
            <input
              className="hover:cursor-pointer"
              type="radio"
              name="subscription"
              value={value}
              defaultChecked={value === 'unsubscribe'}
            />
            <Typography as="label" fontSize={14} className="text-secondary-black">
              {formatMessage({ id: value, defaultMessage: value })}
            </Typography>
          </div>
        ))}
      </div>
    </AccountForm>
  );
};

export default SubscribeForm;
