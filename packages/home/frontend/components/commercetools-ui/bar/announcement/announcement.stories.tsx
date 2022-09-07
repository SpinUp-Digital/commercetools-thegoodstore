import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AnnouncementBar from '.';

export default {
  title: 'Frontastic/Announcement Bar',
  component: AnnouncementBar,
} as ComponentMeta<typeof AnnouncementBar>;

const Template: ComponentStory<typeof AnnouncementBar> = (args) => <AnnouncementBar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: 'SUBCRIBE FOR 10% OFF YOUR FIRST ORDER',
  highlightedSubstring: 'SUBSCRIBE',
};
