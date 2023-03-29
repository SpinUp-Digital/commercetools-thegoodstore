import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '.';
import Typography from '../typography';

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Input Component
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-44 w-[40%] justify-start">
      <Input {...args} variant="primary" placeholder="Placeholder" label="Primary" />
      <div className="mt-24">
        <Input {...args} variant="secondary" placeholder="Placeholder" label="Secondary" />{' '}
      </div>
      <div className="mt-24">
        <Input {...args} disabled placeholder="Placeholder" label="Disabled" />
      </div>
    </div>
  </div>
);

export const Default = Template.bind({});
