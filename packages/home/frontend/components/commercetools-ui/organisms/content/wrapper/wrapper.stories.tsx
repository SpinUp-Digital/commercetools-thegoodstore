import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Wrapper from '.';

export default {
  title: 'Frontastic/Wrapper',
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <div>Hello, World!</div>,
};
