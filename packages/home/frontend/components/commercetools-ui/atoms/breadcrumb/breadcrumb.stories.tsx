import React from 'react';
import { Story, Meta } from '@storybook/react';
import Breadcrumb, { BreadcrumbProps } from './index';

export default {
  title: 'Components/Atoms/Breadcrumb',
  component: Breadcrumb,
} as Meta;

const links = ['Root Category', 'Sub Category 1', 'Sub Category 2', 'Sub Category 3', 'Sub Category 4'];

const Template: Story<BreadcrumbProps> = (args) => <Breadcrumb {...args}>{links}</Breadcrumb>;

export const Primary = Template.bind({});
Primary.args = {
  Separator: '/',
};
