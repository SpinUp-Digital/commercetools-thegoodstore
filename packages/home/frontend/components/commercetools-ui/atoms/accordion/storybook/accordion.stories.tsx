import React from 'react';
import { Story, Meta } from '@storybook/react';
import Accordion from '../index';
import AccordionContent from './accordion-content';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {},
} as Meta;

const Template: Story = () => <AccordionContent />;

export const Default = Template.bind({});
