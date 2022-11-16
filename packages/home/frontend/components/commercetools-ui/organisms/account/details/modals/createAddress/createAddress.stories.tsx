import React from 'react';
import { Story, Meta } from '@storybook/react';
import CreateAddress, { CreateAddressProps } from './index';

export default {
  title: 'commercetools Frontend/Organisms/CreateAddress',
  component: CreateAddress,
  argTypes: {},
} as Meta;

const Template: Story<CreateAddressProps> = (args) => (
  <CreateAddress addressId="adrs-1" onClose={() => console.log('Closed')} open={true} {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
