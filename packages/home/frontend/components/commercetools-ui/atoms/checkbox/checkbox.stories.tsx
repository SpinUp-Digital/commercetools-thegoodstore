import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox from '.';
import Typography from '../typography';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} className="mt-40 w-[40%] font-bold text-black">
      Checkbox
    </Typography>
    <Typography fontSize={20} lineHeight="loose" className="mt-20 w-[60%] text-neutral-700">
      The Checkbox component allows customers to select one or more items from a list of options.
    </Typography>

    <div className="mt-40 flex w-[70%]">
      <span className="mr-8">Checkbox</span>
      <Checkbox {...args} />
    </div>
  </div>
);

export const Primary = Template.bind({});
