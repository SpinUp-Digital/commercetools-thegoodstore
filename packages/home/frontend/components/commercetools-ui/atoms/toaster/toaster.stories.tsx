import React from 'react';
import { Story, Meta } from '@storybook/react';
import Toaster from './index';

export default {
  title: 'commercetools Frontend/Atoms/Toaster',
  component: Toaster,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <Toaster {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
