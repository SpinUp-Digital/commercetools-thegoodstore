import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from '.';
import { fontSizes, tagTypesToUse, TypographyProps } from './types';

export default {
  title: 'commercetools Frontend/Atoms/Typography',
  component: Typography,
  argTypes: {
    fontFamily: { control: { type: 'select' }, options: ['libre', 'inter'], defaultValue: 'libre' },
    as: { control: { type: 'select' }, options: ['fragment', ...tagTypesToUse], defaultValue: 'p' },
    fontSize: { control: { type: 'select' }, options: fontSizes, defaultValue: 16 },
    medium: { control: 'boolean', defaultValue: false },
    underline: { control: 'boolean', defaultValue: false },
  },
} as Meta;

const Template: Story<TypographyProps> = (args) => <Typography {...args}>Typography Component</Typography>;

export const Default = Template.bind({});
Default.args = {
  fontFamily: 'inter',
  as: 'h1',
  fontSize: 58,
};
