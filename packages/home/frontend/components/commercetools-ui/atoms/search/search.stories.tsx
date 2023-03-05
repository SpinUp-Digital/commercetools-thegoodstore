import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Search from '.';

export default {
  title: 'commercetools Frontend/Atoms/Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  categories: [],
};
