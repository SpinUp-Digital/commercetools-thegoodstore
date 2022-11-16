import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AccountDropdown from '.';

export default {
  title: 'commercetools Frontend/Organisms/Account Dropdown',
  component: AccountDropdown,
} as ComponentMeta<typeof AccountDropdown>;

const Template: ComponentStory<typeof AccountDropdown> = (args) => <AccountDropdown {...args} />;

export const Primary = Template.bind({});
