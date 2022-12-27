import React from 'react';
import { Story, Meta } from '@storybook/react';
import { cart } from 'helpers/mocks/mockData';
import MobileOrderSummary, { Props as MobileOrderSummaryProps } from './index';

export default {
  title: 'commercetools Frontend/Organisms/OrderSummaryMobile',
  component: MobileOrderSummary,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<MobileOrderSummaryProps> = (args) => (
  <div>
    <h2 className="py-10 text-2xl">Decrease Screen Size for visibility </h2>
    <MobileOrderSummary
      {...args}
      cart={cart}
      editCartItem={() => console.log('Edited')}
      removeCartItem={() => console.log('Removed')}
      goToProductPage={() => console.log('Gone')}
    />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {};
