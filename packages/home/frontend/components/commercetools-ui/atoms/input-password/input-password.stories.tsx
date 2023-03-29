import { ComponentMeta, ComponentStory } from '@storybook/react';
import InputPassword from '.';
import Typography from '../typography';

export default {
  title: 'Components/Input Password',
  component: InputPassword,
} as ComponentMeta<typeof InputPassword>;

const Template: ComponentStory<typeof InputPassword> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Input Password Component
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="w-[40%]">
      <div className="mt-40">
        <InputPassword {...args} variant="primary" placeholder="Placeholder" label="Primary" />
      </div>
      <div className="mt-24">
        <InputPassword {...args} variant="secondary" placeholder="Placeholder" label="Secondary" />
      </div>
      <div className="mt-24">
        <InputPassword {...args} disabled placeholder="Placeholder" label="Disabled" />
      </div>
    </div>
  </div>
);

export const Default = Template.bind({});
