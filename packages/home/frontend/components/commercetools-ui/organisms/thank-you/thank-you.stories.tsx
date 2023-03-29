import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { orders } from 'helpers/mocks/mockCommonData';
import ThankYou from './index';
import ThankYouContent from './thank-you-content';

export default {
  title: 'Components/ThankYou',
  component: ThankYou,
  argTypes: {},
} as Meta;

const Template: Story = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] whitespace-nowrap text-primary-black">
      Thank you page
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-full leading-6 text-secondary-black md:w-[60%]">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-40">
      <ThankYouContent order={orders[0]} {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
