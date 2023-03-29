import { Meta, Story } from '@storybook/react';
import Link, { LinkProps } from '.';
import Typography from '../typography';

export default {
  title: 'Components/Link',
  component: Link,
} as Meta;

const Template: Story<LinkProps> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Link Component
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>

    <div className="mt-40 w-[70%]">
      <Link variant="primary" link="https://www.youtube.com" placeholder="Placeholder">
        Primary link go there
      </Link>
    </div>
    <div className="mt-20 w-[70%]">
      <Link variant="breadcrumb" link="https://www.youtube.com" placeholder="Placeholder">
        Breadcrumb link go there
      </Link>
    </div>
    <div className="mt-20 w-[70%]">
      <Link variant="menu-header" link="https://www.youtube.com" placeholder="Placeholder">
        Menu header link go there
      </Link>
    </div>
    <div className="mt-20 w-[70%]">
      <Link variant="menu-item" link="https://www.youtube.com" placeholder="Placeholder">
        Menu item link go there
      </Link>
    </div>
  </div>
);

export const Default = Template.bind({});
