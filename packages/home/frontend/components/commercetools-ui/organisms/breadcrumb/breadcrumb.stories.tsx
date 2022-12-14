import React from 'react';
import { Story, Meta } from '@storybook/react';
import Breadcrumb, { BreadcrumbProps } from './index';

export default {
  title: 'commercetools Frontend/Organisms/Breadcrumb',
  component: Breadcrumb,
} as Meta;

const links = ['link 1', 'link 2', 'link 3', 'link 4', 'link 5'];

const Template: Story<BreadcrumbProps> = (args) => <Breadcrumb {...args}>{links}</Breadcrumb>;

export const Primary = Template.bind({});
Primary.args = {
  Separator: '/',
};
