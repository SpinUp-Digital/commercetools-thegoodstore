import React from 'react';
import { Popover } from '@headlessui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AccountButton from 'components/commercetools-ui/organisms/header/utility-section/components/account-button';
import AccountDropdown from '.';

export default {
  title: 'Components/Organisms/Account Dropdown',
  component: AccountButton,
} as ComponentMeta<typeof AccountDropdown>;

const Template: ComponentStory<typeof AccountDropdown> = (args) => <AccountButton />;

export const Primary = Template.bind({});
