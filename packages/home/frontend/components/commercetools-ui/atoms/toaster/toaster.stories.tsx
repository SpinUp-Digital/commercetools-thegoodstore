import React from 'react';
import { Story, Meta } from '@storybook/react';
import toast from 'react-hot-toast';
import Toaster from './index';

export default {
  title: 'Components/Atoms/Toaster',
  component: Toaster,
  argTypes: {
    variant: { control: { type: 'select' }, options: ['info', 'success', 'error'], defaultValue: 'info' },
  },
} as Meta;

const Template: Story = (args) => {
  const showToast = () => {
    const msg = "Hello, I'm a toast!";
    switch (args.variant) {
      case 'info':
        return toast(msg);
      case 'success':
        return toast.success(msg);
      case 'error':
        return toast.error(msg);
    }
  };

  return (
    <div>
      <button onClick={showToast} className="rounded-md border border-secondary-black p-8">
        Make a Toast
      </button>
      <Toaster {...args} />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
