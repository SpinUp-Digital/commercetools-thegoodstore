import React from 'react';
import AccordionBtn from 'components/commercetools-ui/atoms/accordion';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import { FAQ } from '../..';

interface Props {
  faqs: FAQ[];
}

const FAQ: React.FC<Props> = ({ faqs }) => {
  const { formatMessage: formatCustomerSupportMessage } = useFormat({ name: 'customer-support' });
  return (
    <>
      <div className="py-24">
        <Typography fontSize={18} fontFamily="libre">
          {formatCustomerSupportMessage({ id: 'faq', defaultMessage: 'FAQ' })}
        </Typography>
      </div>

      <div className="grid gap-y-16">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-md border border-neutral-400">
            <AccordionBtn
              variant="plusAndMinus"
              iconColor="text-primary-black"
              closedSectionTitle={faq.question}
              buttonClassName="font-medium text-16 py-20 px-16 text-primary-black"
            >
              <Typography
                fontSize={16}
                fontFamily="inter"
                lineHeight="loose"
                className="pl-16 pr-24 pb-20 text-secondary-black"
              >
                {faq.answer}
              </Typography>
            </AccordionBtn>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
