import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from '.';

export default {
  title: 'commercetools Frontend/Atoms/Typography',
  component: Typography,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = () => (
  <Typography as="h1" fontSize={30}>
    Typography Component
  </Typography>
);

export const Primary = Template.bind({});

Primary.args = {};
