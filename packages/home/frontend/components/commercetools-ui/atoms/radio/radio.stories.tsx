import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Radio from '.';

export default {
  title: 'Components/Atoms/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Primary = Template.bind({});
Primary.args = { checked: true };
