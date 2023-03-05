import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Drawer from '.';

export default {
  title: 'commercetools Frontend/Atoms/Drawer',
  component: Drawer,
  argTypes: { direction: { control: { type: 'select' }, options: ['left', 'right', 'top', 'bottom'] } },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="h-full w-full min-w-[300px] bg-white p-24">Hello, there!</div>
      </Drawer>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  direction: 'right',
};
