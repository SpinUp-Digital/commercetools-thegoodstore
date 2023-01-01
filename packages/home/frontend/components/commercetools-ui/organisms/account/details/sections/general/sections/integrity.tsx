import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import InfoCard, { InfoField } from '../atoms/info-card';

const Integrity = () => {
  const { formatMessage } = useFormat({ name: 'account' });

  // Integrity fields
  const integrityButtons: Array<InfoField> = [
    {
      label: formatMessage({ id: 'password.change', defaultMessage: 'Change your password' }),
      value: '#change-password',
    },
    {
      label: formatMessage({ id: 'delete.account', defaultMessage: 'Delete your account' }),
      value: '#delete-account',
    },
  ];

  return (
    <InfoCard title={formatMessage({ id: 'integrity', defaultMessage: 'Integrity' })} clearPadding cardClassName="grid">
      {integrityButtons.map(({ label, value }, index) => (
        <a key={index} href={value} className="hover:cursor-pointer">
          <div className="flex items-center justify-between pr-32 md:pr-36">
            <Typography fontSize={14} medium className="py-24 pl-16 pr-32 text-primary-black md:pl-24">
              {label}
            </Typography>

            <ChevronRightIcon className="h-24 w-20 text-secondary-black" />
          </div>

          {index === 0 && <hr />}
        </a>
      ))}
    </InfoCard>
  );
};

export default Integrity;
