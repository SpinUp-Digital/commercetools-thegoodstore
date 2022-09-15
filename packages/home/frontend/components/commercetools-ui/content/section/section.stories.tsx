import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Section from '.';

export default {
  title: 'Frontastic/Section',
  component: Section,
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => <Section {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'New Arrivals',
  subtitle: 'Explore our new arrivals and shop your favourites.',
  ctaText: 'Shop All',
  children: <div>Hello, World!</div>,
};
