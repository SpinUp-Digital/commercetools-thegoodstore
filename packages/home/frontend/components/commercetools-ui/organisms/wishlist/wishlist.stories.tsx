import React from 'react';
import { Story, Meta } from '@storybook/react';
import WishList, { Props } from './index';

export default {
  title: 'commercetools Frontend/Organisms/Wishlist',
  component: WishList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<Props> = (args) => <WishList {...args} />;

export const Primary = Template.bind({});
