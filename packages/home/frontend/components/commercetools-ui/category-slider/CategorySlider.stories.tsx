import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CategorySlider, { Props } from '.';

export default {
  title: 'Frontastic/Category Slider',
  component: CategorySlider,
} as ComponentMeta<typeof CategorySlider>;

const Template: ComponentStory<typeof CategorySlider> = (args) => <CategorySlider {...args} />;

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

export const Primary = Template.bind({});
Primary.args = { tiles };
