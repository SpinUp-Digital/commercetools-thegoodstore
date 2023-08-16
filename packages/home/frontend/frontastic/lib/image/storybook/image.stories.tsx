import React from 'react';
import { Story, Meta } from '@storybook/react';
import Image from '../index';
import ImageContent from './image-content';

export default {
  title: 'Components/Image',
  component: Image,
  argTypes: {},
} as Meta;

const Template: Story = () => <ImageContent />;

export const Default = Template.bind({});
