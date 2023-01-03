import React from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import { FAQ } from '../..';
import ContactUs from './contact-us';
import FAQuestions from './faq';

interface Props {
  phoneNumber: string;
  workingHoursWeekdays: string;
  workingHoursWeekends: string;
  email: string;
  addressLine: string;
  cityAndPostalCode: string;
  country: string;
  faqs: FAQ[];
}

const CustomerSupport: React.FC<Props> = ({
  phoneNumber,
  workingHoursWeekdays,
  workingHoursWeekends,
  email,
  addressLine,
  cityAndPostalCode,
  country,
  faqs,
}) => {
  const { formatMessage: formatCustomerSupportMessage } = useFormat({ name: 'customer-support' });
  return (
    <>
      <div className="pb-12 pt-16">
        <Typography as="h2" fontSize={24} fontFamily="libre" className="text-primary-black">
          {formatCustomerSupportMessage({ id: 'customer.support', defaultMessage: 'Customer Support' })}
        </Typography>
      </div>

      <div className="py-16">
        <Typography as="h3" fontSize={16} fontFamily="inter" className="text-secondary-black">
          {formatCustomerSupportMessage({ id: 'help.question', defaultMessage: 'How can we help you today?' })}
        </Typography>
      </div>

      <ContactUs
        phoneNumber={phoneNumber}
        workingHoursWeekdays={workingHoursWeekdays}
        workingHoursWeekends={workingHoursWeekends}
        email={email}
        addressLine={addressLine}
        cityAndPostalCode={cityAndPostalCode}
        country={country}
      />

      <FAQuestions faqs={faqs} />
    </>
  );
};

export default CustomerSupport;
