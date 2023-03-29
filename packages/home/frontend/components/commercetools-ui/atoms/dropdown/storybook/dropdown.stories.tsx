import React from 'react';
import { Story, Meta } from '@storybook/react';
import Dropdown, { DropdownProps } from '..';
import DropdownContent from './dropdown-content';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as Meta;

const Template: Story<DropdownProps> = () => <DropdownContent />;

export const Primary = Template.bind({});
