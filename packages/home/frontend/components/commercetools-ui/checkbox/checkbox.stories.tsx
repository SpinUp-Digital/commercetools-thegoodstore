import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox from '.';

export default {
  title: 'Frontastic/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
