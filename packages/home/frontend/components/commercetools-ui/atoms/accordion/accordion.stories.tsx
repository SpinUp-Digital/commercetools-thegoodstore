import React from 'react';
import { Story, Meta } from '@storybook/react';
import { accordionMockItems } from 'helpers/mocks/mockData';
import AccordionBtn from './index';

export default {
  title: 'commercetools Frontend/Atoms/AccordionButton',
  component: AccordionBtn,
  argTypes: {},
} as Meta;

const Template: Story = (args) => (
  <div className="flex flex-col items-stretch gap-8">
    {accordionMockItems.map((item, index) => (
      <AccordionBtn
        key={index}
        variant="arrow"
        closedSectionTitle={item.title}
        openSectionTitle={item.title}
        className={`p-8 ${index < accordionMockItems.length - 1 ? 'border-b-2' : ''}`}
        panelClassName="p-8 text-secondary-black"
        {...args}
      >
        {item.content}
      </AccordionBtn>
    ))}
  </div>
);

export const Primary = Template.bind({});

Primary.args = {};
