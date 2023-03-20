import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Drawer from '.';

export default {
  title: 'Components/Atoms/Drawer',
  component: Drawer,
  argTypes: { direction: { control: { type: 'select' }, options: ['left', 'right', 'top', 'bottom'] } },
} as ComponentMeta<typeof Drawer>;

const LeftMenuTemplate: ComponentStory<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        Open left drawer
      </button>
      <Drawer direction="left" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="h-full w-full min-w-[300px] bg-white p-24">
          Hello there, I&apos;m a left Menu; click outside to close me!
        </div>
      </Drawer>
    </div>
  );
};

const RightMenuTemplate: ComponentStory<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full">
      <button
        className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        Open right drawer
      </button>
      <Drawer direction="right" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="h-full w-full min-w-[300px] bg-white p-24">
          Hello there, I&apos;m a right Menu; click outside to close me!
        </div>
      </Drawer>
    </div>
  );
};

const TopMenuTemplate: ComponentStory<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full">
      <button
        className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        Open top drawer
      </button>
      <Drawer direction="top" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="h-full w-full min-w-[300px] bg-white p-24">
          Hello there, I&apos;m a Top Menu; click outside to close me!
        </div>
      </Drawer>
    </div>
  );
};

const BottomMenuTemplate: ComponentStory<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full">
      <button
        className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        Open bottom drawer
      </button>
      <Drawer direction="bottom" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="h-full w-full min-w-[300px] bg-white p-24">
          Hello there, I&apos;m a Bottom Menu; click outside to close me!
        </div>
      </Drawer>
    </div>
  );
};

export const LeftMenu = LeftMenuTemplate.bind({});

export const RightMenu = RightMenuTemplate.bind({});

export const TopMenu = TopMenuTemplate.bind({});

export const BottomMenu = BottomMenuTemplate.bind({});
