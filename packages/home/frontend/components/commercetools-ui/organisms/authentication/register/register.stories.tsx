import React from 'react';
import { Story, Meta } from '@storybook/react';
import Register, { RegisterProps } from './index';

export default {
  title: 'Components/Organisms/Register',
  component: Register,
  argTypes: {},
} as Meta;

const Template: Story<RegisterProps> = (args) => <Register {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
