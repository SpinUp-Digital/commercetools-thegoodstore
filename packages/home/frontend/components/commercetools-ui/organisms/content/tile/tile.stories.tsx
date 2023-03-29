import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { headerButtonLink } from 'helpers/mocks/mockData';
import { Reference } from 'types/reference';
import Tile, { TileProps } from './index';

export default {
  title: 'Components/Tile',
  component: Tile,
  argTypes: {},
} as Meta;

const Template: Story<TileProps> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Hero Tile
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-44 ml-80">
      <Tile
        {...args}
        image={{
          src: 'https://res.cloudinary.com/dlwdq84ig/image/upload/w_1920,q_auto,c_scale/bwew6xc0u3s9ctxyirle',
        }}
        title="Here are some lovely texts just for testing if things go great, hopefully so"
        subtitle="Here are some lovely Subtitle texts just for testing"
        ctaLabel="Call To Action"
        ctaReference={headerButtonLink as Reference}
        className="h-[550px] w-[85%]"
      />
    </div>
  </div>
);

export const Default = Template.bind({});
