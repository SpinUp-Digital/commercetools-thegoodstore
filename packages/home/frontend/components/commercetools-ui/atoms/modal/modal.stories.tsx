import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Modal from '.';

export default {
  title: 'Components/Atoms/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="rounded-md bg-primary-black px-16 py-8 text-white transition hover:bg-neutral-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        Open modal
      </button>
      <Modal {...args} isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <div className="min-h-[300px] bg-white p-24">
          Hello there! I&apos;m a modal click either outside or the &quot;X&quot; to close me
        </div>
      </Modal>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  closeButton: true,
};
