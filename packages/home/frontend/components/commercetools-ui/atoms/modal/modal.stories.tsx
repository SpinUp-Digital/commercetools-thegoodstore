import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Modal from '.';

export default {
  title: 'commercetools Frontend/Atoms/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toogle</button>
      <Modal {...args} isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <div className="min-h-[300px] bg-white p-24">Hello, there!</div>
      </Modal>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  closeButton: true,
};
