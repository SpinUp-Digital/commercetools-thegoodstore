import React from 'react';
import { Story, Meta } from '@storybook/react';
import { account, cart } from 'helpers/mocks/mockData';
import CheckoutForm, { Props as CheckoutFormProps } from './index';

export default {
  title: 'commercetools Frontend/Organisms/CheckoutForm',
  component: CheckoutForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CheckoutFormProps> = (args) => (
  <div className="w-80 px-20">
    <CheckoutForm
      {...args}
      data={cart as unknown as { [key: string]: string }}
      account={account}
      submitForm={() => console.log('Submitted')}
      submitText="Submitted"
      updateFormInput={() => console.log('Updated')}
      isFormValid={true}
    />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {};
