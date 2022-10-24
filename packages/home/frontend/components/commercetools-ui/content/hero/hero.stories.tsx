import React from 'react';
import { Story, Meta } from '@storybook/react';
import { headerButtonLink } from 'helpers/mocks/mockData';
import { Reference } from 'types/reference';
import Hero, { HeroProps } from './index';

export default {
  title: 'Frontastic/Hero',
  component: Hero,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HeroProps> = (args) => (
  <Hero
    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLB-QKWMqHVctQj_ZVrpk9RGS7N6TBsMHEIE4WeynpD9DCBpvUa7swU_HcMw7PgQARb2U&usqp=CAU"
    title="Here are some lovely texts just for testing if things go great, hopefully so"
    subtitle="Here are some lovely Subtitle texts just for testing if things go great, hopefully so"
    ctaLabel="Call To Action"
    ctaReference={headerButtonLink as Reference}
    {...args}
  />
);

export const Primary = Template.bind({});
