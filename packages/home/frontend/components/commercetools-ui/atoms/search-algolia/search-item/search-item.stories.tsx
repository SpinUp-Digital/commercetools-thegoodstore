import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InstantSearch } from 'react-instantsearch-hooks';
import { searchClient } from 'algolia/searchClient';
import SearchItem from '.';

export default {
  title: 'Components/Atoms/Search Item',
  component: SearchItem,
} as ComponentMeta<typeof SearchItem>;

const Template: ComponentStory<typeof SearchItem> = (args) => (
  <InstantSearch indexName="" searchClient={searchClient}>
    <SearchItem {...args} />
  </InstantSearch>
);

export const Primary = Template.bind({});
Primary.args = {
  categories: [],
  hit: {
    __position: 0,
    objectID: '1',
    productId: '951239c8-58fa-4190-bd9f-45ca3ea6f6a0',
    version: '38',
    name: 'Traditional L Seater Sofa',
    _highlightResult: {
      name: {
        value: '<mark>Traditional</mark> L Seater Sofa',
        matchLevel: 'full',
        fullyHighlighted: false,
        matchedWords: ['traditional'],
      },
    },
    categories: [
      {
        categoryId: 'c5a3d83f-0ada-408f-84fc-a754d6aca8be',
      },
      {
        categoryId: '9e3934ee-d53f-4f3c-af09-5bb279f30672',
      },
      {
        categoryId: 'eab8e720-8046-46fb-a9be-1a397ef24f21',
      },
      {
        categoryId: '9c5ec253-dfc8-45c4-b79c-0686262c57d3',
      },
    ],
    variants: [
      {
        id: '1',
        sku: 'TLSS-01',
        images: [
          'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305739649-_ZXpDL48.jpeg',
          'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305739419-AmHTon4o.jpeg',
          'https://2eca75039cf911b9bbe5-79bfd3e36f011d786971804e873c4354.ssl.cf3.rackcdn.com/AdobeStock_305740930-1rFVdtIo.jpeg',
        ],
        attributes: {
          color: '#ebe6e1',
          colorlabel: 'Beige',
          finish: '#2e2822',
          finishlabel: 'Espresso',
          productspec: '- Cotton upholstery\n- Comes with accent pillows\n- Assembly on site',
        },
        price: {
          fractionDigits: 2,
          centAmount: 359900,
          currencyCode: 'GBP',
        },
        isOnStock: true,
      },
    ],
  },
};
