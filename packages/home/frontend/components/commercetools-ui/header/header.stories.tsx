import React from 'react';
import { Story, Meta } from '@storybook/react';
import { headerButtonLink, headerAccountLink, headerLinks } from 'helpers/mocks/mockData';
import Header, { HeaderProps } from './index';

export default {
  title: 'Frontastic/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  tagline: '',
};
