import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { products } from 'helpers/mocks/mockCommonData';
import ProductSlider, { ProductSliderProps } from '.';

export default {
  title: 'Components/ProductSlider',
  component: ProductSlider,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ProductSliderProps> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="libre" medium className="mt-40 w-[40%] whitespace-nowrap text-primary-black">
      Product Slider
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-full leading-6 text-secondary-black md:w-[60%]">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-40 w-[80%]">
      <ProductSlider
        {...args}
        products={products}
        title="This is a Product Slider"
        ctaLabel="A Call to Action"
        classNames={{ title: 'pt-20 ' }}
      />
    </div>
  </div>
);

export const Default = Template.bind({});

Default.args = {};
