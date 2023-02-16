import { FC } from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { TypographyProps } from 'components/commercetools-ui/atoms/typography/types';
import { useFormat } from 'helpers/hooks/useFormat';
import { Account } from 'types/account';
import PrintButton from './printButton';

type ThankYouHeaderProps = {
  email?: Account['email'];
  onPrint: (e: React.FormEvent) => void;
};

const ThankYouHeader: FC<ThankYouHeaderProps> = ({ email, onPrint }) => {
  const { formatMessage } = useFormat({ name: 'thank-you' });

  const subtitleProps: TypographyProps = {
    fontSize: 14,
    lineHeight: 'loose',
    className: 'text-primary-black md:text-16 lg:text-18',
  };

  return (
    <div className="grid justify-items-center gap-24 border-b border-neutral-400 pt-16 pb-24 md:border-b-0 lg:justify-items-start lg:p-0">
      {/* Title */}
      <Typography className="leading-[22px] text-primary-black md:text-18 lg:text-22" fontSize={16} fontFamily="libre">
        {formatMessage({ id: 'thank.for.order', defaultMessage: 'Thank you for your order' })}
      </Typography>

      {/* Subtitle */}
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <Typography {...subtitleProps}>
          {formatMessage({ id: 'email.sent', defaultMessage: 'An email confirmation has been sent to' })}
        </Typography>
        <Typography medium {...subtitleProps}>
          {email}
        </Typography>
      </div>

      <PrintButton onPrint={onPrint} className="w-full py-8 md:w-fit md:px-68 lg:hidden" />
    </div>
  );
};

export default ThankYouHeader;
