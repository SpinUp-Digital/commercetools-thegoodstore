import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '.';

export default {
  title: 'Frontastic/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>To the campaign</Button>;

export const White = Template.bind({});
White.args = {
  colorScheme: 'white',
};

export const Blue = Template.bind({});
Blue.args = {
  colorScheme: 'blue',
};
