import { useState } from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import AccountForm from 'components/commercetools-ui/organisms/account/account-atoms/account-form';
import useFeedbackToasts from 'components/commercetools-ui/organisms/account/hooks/useFeedbackToasts';
import useDiscardForm from 'components/commercetools-ui/organisms/account/useDiscardForm';
import { useFormat } from 'helpers/hooks/useFormat';
import { Account } from 'types/account';
import { useAccount } from 'frontastic';

const SubscribeForm = () => {
  const { account, updateSubscription } = useAccount();
  const { formatMessage } = useFormat({ name: 'account' });
  const { notifyDataUpdated, notifyWentWrong } = useFeedbackToasts();
  const { discardForm } = useDiscardForm();

  const [subscribed, setSubscribed] = useState((account as Account)?.isSubscribed ?? false);

  const values = ['subscribe', 'unsubscribe'];

  const handleSubmit = () => {
    updateSubscription(subscribed).then((account) => {
      if (account.accountId) {
        notifyDataUpdated();
        discardForm();
      } else {
        notifyWentWrong();
        discardForm();
      }
    });
  };

  return (
    <AccountForm
      title={formatMessage({ id: 'subscribe.update', defaultMessage: 'Update Subscription' })}
      defaultCTASection
      onSubmit={handleSubmit}
    >
      <div className="mb-44 grid gap-24">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-12">
            <input
              className="hover:cursor-pointer"
              type="radio"
              name="subscription"
              value={value}
              onChange={(e) => setSubscribed(e.target.value === 'subscribe')}
              defaultChecked={!!subscribed ? value == 'subscribe' : value == 'unsubscribe'}
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
