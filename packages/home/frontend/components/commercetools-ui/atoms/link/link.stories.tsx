import { Meta, Story } from '@storybook/react';
import Link, { LinkProps } from '.';

export default {
  title: 'Components/Atoms/Link',
  component: Link,
} as Meta;

const Template: Story<LinkProps> = (args) => (
  <Link {...args} link="https://www.youtube.com" placeholder="Placeholder">
    go there
  </Link>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Breadcrumb = Template.bind({});
Breadcrumb.args = {
  variant: 'breadcrumb',
};

export const MenuHeader = Template.bind({});
MenuHeader.args = {
  variant: 'menu-header',
};

export const MenuItem = Template.bind({});
MenuItem.args = {
  variant: 'menu-item',
};
