import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProductSlider, { ProductSliderProps } from '.';

export default {
  title: 'Components/Organisms/ProductSlider',
  component: ProductSlider,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ProductSliderProps> = (args) => (
  <ProductSlider {...args} products={[]} title="This is a Product Slider" ctaLabel="A Call to Action" />
);

export const Primary = Template.bind({});

Primary.args = {};
