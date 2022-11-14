import React from 'react';
import { Story, Meta } from '@storybook/react';
import Header from './index';
import { HeaderProps } from './types';

export default {
  title: 'commercetools Frontend/Organisms/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
