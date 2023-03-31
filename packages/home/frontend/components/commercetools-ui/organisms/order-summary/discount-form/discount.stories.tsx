import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import DiscountForm, { Props as DiscountProps } from './index';

export default {
  title: 'Components/DiscountForm',
  component: DiscountForm,
  argTypes: {},
} as Meta;

const Template: Story<DiscountProps> = (args) => (
  <div className="ml-44 w-full">
    <Typography fontSize={28} className="mt-40 w-[40%] font-bold text-black">
      Discount Form
    </Typography>
    <Typography fontSize={20} lineHeight="loose" className="mt-20 w-[60%] text-neutral-700">
      The Discount Form provides customers with a way to enter discount codes or promotional offers. It contains input
      and discount cards, type “SummerDiscount” to test.
    </Typography>
    <div className="mt-44 flex w-[25%] justify-start border bg-white px-20 pb-20 shadow-400">
      <DiscountForm {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
