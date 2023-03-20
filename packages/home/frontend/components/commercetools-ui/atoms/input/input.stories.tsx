import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '.';

export default {
  title: 'Components/Atoms/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} placeholder="Placeholder" label="Label" />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
