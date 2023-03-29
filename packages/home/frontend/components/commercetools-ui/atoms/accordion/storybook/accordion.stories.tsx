import React from 'react';
import { Story, Meta } from '@storybook/react';
import Accordion from '../index';
import AccordionContent from './accordion-content';
import AccordionContentCustom from './accordion-content-custom';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {},
} as Meta;

const Template: Story = () => <AccordionContent />;

const CustomTemplate: Story = () => <AccordionContentCustom />;

export const Default = Template.bind({});
Default.args = {};

export const CustomAccordionButton = CustomTemplate.bind({});
