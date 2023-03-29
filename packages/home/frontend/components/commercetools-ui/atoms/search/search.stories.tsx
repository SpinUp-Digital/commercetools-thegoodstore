import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { categories } from 'helpers/mocks/mockData';
import Search from '.';
import SearchAlgolia from '../search-algolia';
import Typography from '../typography';

export default {
  title: 'Components/Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Default Search Component
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>

    <div className="mt-40 w-[70%]">
      <Search {...args} />
    </div>
  </div>
);

export const DefaultSearch = Template.bind({});
DefaultSearch.args = {
  categories: [],
};

const TemplateAlgolia: ComponentStory<typeof Search> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Algolia Search Component
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>

    <div className="mt-40 w-[70%]">
      <SearchAlgolia {...args} categories={categories} />
    </div>
  </div>
);
export const AlgoliaSearch = TemplateAlgolia.bind({});
