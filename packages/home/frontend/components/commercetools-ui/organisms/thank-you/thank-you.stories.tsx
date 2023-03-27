import React from 'react';
import { Story, Meta } from '@storybook/react';
import { orders } from 'helpers/mocks/mockCommonData';
import ThankYou from './index';
import ThankYouContent from './thank-you-content';

export default {
  title: 'Components/ThankYou',
  component: ThankYou,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <ThankYouContent order={orders[0]} {...args} />;

export const Default = Template.bind({});
