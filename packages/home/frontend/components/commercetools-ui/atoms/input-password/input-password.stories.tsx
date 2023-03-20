import { ComponentMeta, ComponentStory } from '@storybook/react';
import InputPassword from '.';

export default {
  title: 'Components/Atoms/Input Password',
  component: InputPassword,
} as ComponentMeta<typeof InputPassword>;

const Template: ComponentStory<typeof InputPassword> = (args) => (
  <InputPassword {...args} placeholder="Placeholder" label="Label" />
);

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
