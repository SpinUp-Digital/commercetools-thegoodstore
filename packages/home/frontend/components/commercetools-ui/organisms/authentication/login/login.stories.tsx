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
    <Typography fontSize={28} className="mt-40 w-[40%] font-bold text-black">
      Login Form
    </Typography>
    <Typography fontSize={20} lineHeight="loose" className="mt-20 w-[60%] text-neutral-700">
      The Login Form consists of two input fields for the customer&apos;s email and password, along with a button that
      when clicked, submits the form to authenticate the customer&apos;s credentials. The Login Form also includes a
      remember me checkbox and a password reset link.
    </Typography>
    <div className="mt-44 ml-80 w-[30%] gap-x-50">
      <LoginForm {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});

Default.args = {};
