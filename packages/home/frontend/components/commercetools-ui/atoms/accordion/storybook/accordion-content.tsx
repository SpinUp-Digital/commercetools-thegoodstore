import React from 'react';
import { accordionMockItems, accordionFAQMockItems } from 'helpers/mocks/mockAtomsData';
import Typography from '../../typography';
import Accordion from '../index';

const AccordionContent = () => {
  return (
    <div className="ml-44">
      <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
        Accordion Component
      </Typography>
      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>

      <div className="mt-44 flex w-[50%] justify-start">
        <div className="flex w-full flex-col items-stretch gap-8">
          {accordionMockItems.map((item, index) => (
            <Accordion
              key={index}
              variant="arrow"
              closedSectionTitle={item.title}
              openSectionTitle={item.title}
              className={`p-8 ${index < accordionMockItems.length - 1 ? 'border-b-2' : ''}`}
              panelClassName="p-8 text-secondary-black"
            >
              {item.content}
            </Accordion>
          ))}
        </div>
      </div>

      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>

      <div className="mt-40 flex w-[50%] flex-col items-stretch gap-8">
        {accordionFAQMockItems.map((item, index) => (
          <Accordion
            key={index}
            variant="plusAndMinus"
            closedSectionTitle={item.title}
            openSectionTitle={item.title}
            className={`p-8 ${index < accordionFAQMockItems.length - 1 ? 'border-b-2' : ''}`}
            panelClassName="p-8 text-secondary-black"
          >
            {item.content}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default AccordionContent;
