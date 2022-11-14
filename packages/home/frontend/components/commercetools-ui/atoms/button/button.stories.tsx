import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps } from '.';

export default {
  title: 'commercetools Frontend/Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'underlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'full', 'icon'],
      defaultValue: 's',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    loading: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    added: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const toggleButtonFeedback = () => {
    setLoading(true);

    const loadingTimer = setTimeout(() => {
      setLoading(false);
      setAdded(true);
      clearTimeout(loadingTimer);

      const addedTimer = setTimeout(() => {
        setAdded(false);
        clearTimeout(addedTimer);
      }, 500);
    }, 1500);
  };

  return (
    <div className="bg-gray-400 p-30">
      <Button {...args} onClick={toggleButtonFeedback} loading={loading || args.loading} added={added || args.added} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'GO TO CAMPAIGN',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'GO TO CAMPAIGN',
  variant: 'secondary',
};

export const Underlined = Template.bind({});
Underlined.args = {
  children: 'GO TO CAMPAIGN',
  variant: 'underlined',
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: 'GO TO CAMPAIGN',
  variant: 'ghost',
};

export const IconButton = Template.bind({});
IconButton.args = {
  variant: 'primary',
  size: 'icon',
  icon: <LockClosedIcon className="h-18" />,
};

export const IconRight = Template.bind({});
IconRight.args = {
  variant: 'primary',
  children: 'GO TO CAMPAIGN',
  iconPosition: 'right',
  icon: <LockClosedIcon className="h-18" />,
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  variant: 'secondary',
  children: 'GO TO CAMPAIGN',
  iconPosition: 'left',
  icon: <LockClosedIcon className="h-18" />,
};
