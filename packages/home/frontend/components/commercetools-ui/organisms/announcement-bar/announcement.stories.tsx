import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import AnnouncementBar from '.';

export default {
  title: 'Components/Announcement Bar',
  component: AnnouncementBar,
} as ComponentMeta<typeof AnnouncementBar>;

const Template: ComponentStory<typeof AnnouncementBar> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="libre" medium className="mt-40 w-[40%] text-primary-black">
      Announcement Bar
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-44 flex w-[50%] justify-start">
      <AnnouncementBar {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  text: 'SUBCRIBE FOR 10% OFF YOUR FIRST ORDER',
  highlightedSubstring: 'SUBSCRIBE',
};
