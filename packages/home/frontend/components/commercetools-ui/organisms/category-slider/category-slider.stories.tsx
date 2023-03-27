import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import CategorySlider, { Props } from '.';

export default {
  title: 'Components/Category Slider',
  component: CategorySlider,
} as ComponentMeta<typeof CategorySlider>;

const Template: ComponentStory<typeof CategorySlider> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="libre" medium className="mt-40 w-[40%] text-primary-black">
      Category Slider
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-44  justify-start">
      <CategorySlider {...args} />
    </div>
  </div>
);

const tiles = [
  {
    title: 'Sofas & Armchairs',
    image: {
      src: 'https://static.dezeen.com/uploads/2022/05/ella-chair-matthew-hilton-case-furniture-design_dezeen_2364_hero.jpg',
    },
  },
  {
    title: 'Home Decor',
    image: {
      src: 'https://static.dezeen.com/uploads/2022/05/ella-chair-matthew-hilton-case-furniture-design_dezeen_2364_hero.jpg',
    },
  },
  {
    title: 'Curtains & Drapes',
    image: {
      src: 'https://static.dezeen.com/uploads/2022/05/ella-chair-matthew-hilton-case-furniture-design_dezeen_2364_hero.jpg',
    },
  },
  {
    title: 'Sofas & Armchairs',
    image: {
      src: 'https://static.dezeen.com/uploads/2022/05/ella-chair-matthew-hilton-case-furniture-design_dezeen_2364_hero.jpg',
    },
  },
] as Props['tiles'];

export const Default = Template.bind({});
Default.args = { tiles };
