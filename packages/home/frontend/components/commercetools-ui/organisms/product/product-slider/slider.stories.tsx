import React from 'react';
import { Story, Meta } from '@storybook/react';
import { products } from 'helpers/mocks/mockData';
import ProductSlider, { ProductSliderProps } from '.';

export default {
  title: 'commercetools Frontend/Organisms/ProductSlider',
  component: ProductSlider,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ProductSliderProps> = (args) => (
  <ProductSlider {...args} products={products} title="This is a Product Slider" ctaLabel="A Call to Action" />
);

export const Primary = Template.bind({});

Primary.args = {};
