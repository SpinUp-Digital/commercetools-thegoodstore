import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { categories } from 'helpers/mocks/mockData';
import Search from '.';

export default {
  title: 'Components/Atoms/Search Algolia',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} categories={categories} />;

export const Primary = Template.bind({});
Primary.args = { categories: [] };
