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
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Discount Form
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize (Enter &quot;SummerDiscount&quot; to test)
    </Typography>
    <div className="mt-44 flex w-[25%] justify-start border bg-white px-20 pb-20 shadow-400">
      <DiscountForm {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
