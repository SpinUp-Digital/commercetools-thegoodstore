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
    <Typography fontSize={28} className="mt-40 w-[40%] font-bold text-black">
      Default Search and Algolia Search Component
    </Typography>
    <Typography fontSize={20} lineHeight="loose" className="mt-20 w-[60%] text-neutral-700">
      The Search component consists of an input field where customers can enter keywords or phrases related to the
      content they are searching for. The Search bar presents search auto-suggestions and product suggestions.The search
      component integrated with Algolia
    </Typography>

    <Typography fontSize={20} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Default Search
    </Typography>

    <div className="mt-24 w-[70%]">
      <Search {...args} />
    </div>
    <Typography fontSize={20} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Algolia Search
    </Typography>

    <div className="mt-24 w-[70%]">
      <SearchAlgolia {...args} categories={categories} />
    </div>
  </div>
);

export const DefaultSearch = Template.bind({});
DefaultSearch.args = {
  categories: [],
};
