import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Drawer from '..';
import DrawerContent from './drawer-content';

export default {
  title: 'Components/Menus',
  component: Drawer,
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = () => <DrawerContent />;
export const Default = Template.bind({});
