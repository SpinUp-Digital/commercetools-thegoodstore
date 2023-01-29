import InfoCard, { InfoField } from 'components/commercetools-ui/organisms/account/account-atoms/info-card';
import { useFormat } from 'helpers/hooks/useFormat';
import { Account } from 'types/account';
import { useAccount } from 'frontastic';

const Newsletter = () => {
  const { formatMessage } = useFormat({ name: 'account' });
  const { account } = useAccount();

  const subscribed = formatMessage({ id: 'subscribe', defaultMessage: 'Yes, I want to subscribe.' });
  const unsubscribed = formatMessage({ id: 'unsubscribe', defaultMessage: 'No, I do not wish to receive emails.' });

  const subscriptionField: InfoField = {
    label: formatMessage({ id: 'subscription', defaultMessage: 'Subscription' }),
    value: (account as Account)?.isSubscribed ? subscribed : unsubscribed,
  };
  return <InfoCard isEditable title="Newsletter" infoFields={[subscriptionField]} editHref="#edit-newsletter" />;
};

export default Newsletter;
