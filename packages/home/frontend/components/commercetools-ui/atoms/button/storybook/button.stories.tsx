import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps } from '..';
import ButtonContent from './button-content';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = () => <ButtonContent />;

export const Default = Template.bind({});
