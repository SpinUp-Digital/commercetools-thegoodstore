import { useState } from 'react';
import Radio from 'components/commercetools-ui/atoms/radio';
import Typography from 'components/commercetools-ui/atoms/typography';
import AccountForm from 'components/commercetools-ui/organisms/account/account-atoms/account-form';
import useDiscardForm from 'components/commercetools-ui/organisms/account/hooks/useDiscardForm';
import useFeedbackToasts from 'components/commercetools-ui/organisms/account/hooks/useFeedbackToasts';
import { useFormat } from 'helpers/hooks/useFormat';
import { Account } from 'types/account';
import { useAccount } from 'frontastic';

const SubscribeForm = () => {
  const { account, updateSubscription } = useAccount();
  const { formatMessage } = useFormat({ name: 'account' });
  const { notifyDataUpdated, notifyWentWrong } = useFeedbackToasts();
  const { discardForm } = useDiscardForm();

  const [subscribed, setSubscribed] = useState((account as Account)?.isSubscribed ?? false);
  const [loading, setLoading] = useState(false);

  const values = ['subscribe', 'unsubscribe'];

  const handleSubmit = () => {
    setLoading(true);
    updateSubscription(subscribed).then((account) => {
      if (account.accountId) {
        notifyDataUpdated();
        setLoading(false);
        discardForm();
      } else {
        notifyWentWrong();
        setLoading(false);
        discardForm();
      }
    });
  };

  return (
    <AccountForm
      title={formatMessage({ id: 'subscribe.update', defaultMessage: 'Edit newsletter subscription' })}
      defaultCTASection
      loading={loading}
      onSubmit={handleSubmit}
    >
      <div className="mb-44 grid gap-24">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-12">
            <Radio
              type="radio"
              name="subscription"
              value={value}
              onChecked={() => setSubscribed(value === 'subscribe')}
              checked={!!subscribed ? value === 'subscribe' : value === 'unsubscribe'}
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
