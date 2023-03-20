import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox from '.';

export default {
  title: 'Components/Atoms/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <div className="flex ">
    <span className="pr-8">Checkbox test</span>
    <Checkbox {...args} />
  </div>
);

export const Primary = Template.bind({});
