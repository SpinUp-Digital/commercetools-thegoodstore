import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Radio from '.';
import Typography from '../typography';

export default {
  title: 'Components/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Checkbox Component
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>

    <div className="mt-40 flex w-[70%]">
      <span className="mr-8">Radio Button</span>
      <Radio {...args} />
    </div>
  </div>
);

export const Primary = Template.bind({});
Primary.args = { checked: true };
