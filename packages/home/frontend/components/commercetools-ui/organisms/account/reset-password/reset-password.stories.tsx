import React from 'react';
import { Story, Meta } from '@storybook/react';
import ResetPassword, { ResetPasswordProps } from './index';

export default {
  title: 'commercetools Frontend/Organisms/Reset Password',
  component: ResetPassword,
  argTypes: {},
} as Meta;

const Template: Story<ResetPasswordProps> = (args) => <ResetPassword {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
