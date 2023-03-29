import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps } from '..';
import ButtonSizing from './button-sizing';
import ButtonVariants from './button-variants';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
} as Meta;

const TemplateSizing: Story<ButtonProps> = () => <ButtonSizing />;

const TemplateStyling: Story<ButtonProps> = () => <ButtonVariants />;

export const Sizing = TemplateSizing.bind({});

export const Styles = TemplateStyling.bind({});
