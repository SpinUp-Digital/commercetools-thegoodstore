import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchBar from '.';

export default {
  title: 'commercetools Frontend/Atoms/Search',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Primary = Template.bind({});
