import { ComponentProps, FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import useDiscardForm from '../useDiscardForm';
import SaveOrCancel from './save-or-cancel';

export interface AccountFormProps extends ComponentProps<'form'> {
  title: string;
  subtitle?: string;
  requiredLabelIsVisible?: boolean;
  defaultCTASection?: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const AccountForm: FC<AccountFormProps> = ({
  className,
  title,
  subtitle,
  requiredLabelIsVisible,
  defaultCTASection,
  onSubmit,
  children,
}) => {
  const { discardForm } = useDiscardForm();

  const { formatMessage } = useFormat({ name: 'common' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Typography fontFamily="libre" fontSize={16} className="text-primary-black md:mb-28 md:text-24">
        {title}
      </Typography>

      <div className="relative border-neutral-400 py-24 md:border md:px-32 md:pr-68">
        <XMarkIcon
          className="absolute top-24 right-24 hidden h-24 w-24 stroke-secondary-black stroke-1 hover:cursor-pointer md:block"
          onClick={discardForm}
        />

        {subtitle && (
          <Typography fontSize={16} lineHeight="loose" className="mb-40 text-secondary-black">
            {subtitle}
          </Typography>
        )}

        <div className="max-w-[372px]">
          {children}

          {defaultCTASection && (
            <div className="mt-24 grid items-center justify-between gap-32 md:flex md:gap-16">
              {requiredLabelIsVisible && (
                <Typography fontSize={14} className="leading-[114%] text-secondary-black">
                  {formatMessage({ id: 'required.field', defaultMessage: '* required field' })}
                </Typography>
              )}

              <SaveOrCancel onCancel={discardForm} onSave={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
