import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import Login, { LoginProps } from './index';
import LoginForm from './login-form';

export default {
  title: 'Components/Login',
  component: Login,
  argTypes: {},
} as Meta;

const Template: Story<LoginProps> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Login Form
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-44 ml-80 w-[35%] gap-x-50">
      <LoginForm {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});

Default.args = {};
