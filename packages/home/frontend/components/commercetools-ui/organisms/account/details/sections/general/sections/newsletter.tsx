import { useFormat } from 'helpers/hooks/useFormat';
import InfoCard, { InfoField } from '../../../../account-atoms/info-card';

const Newsletter = () => {
  const { formatMessage } = useFormat({ name: 'account' });

  const subscriptionField: InfoField = {
    label: formatMessage({ id: 'subscription', defaultMessage: 'Subscription' }),
    value: formatMessage({ id: 'subscribe', defaultMessage: 'Yes, I want to subscribe.' }),
  };
  return <InfoCard isEditable title="Newsletter" infoFields={[subscriptionField]} editHref="#edit-newsletter" />;
};

export default Newsletter;
