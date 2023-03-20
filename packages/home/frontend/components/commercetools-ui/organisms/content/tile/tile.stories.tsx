import React from 'react';
import { Story, Meta } from '@storybook/react';
import { headerButtonLink } from 'helpers/mocks/mockData';
import { Reference } from 'types/reference';
import Tile, { TileProps } from './index';

export default {
  title: 'Components/Organisms/Tile',
  component: Tile,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TileProps> = (args) => (
  <Tile
    {...args}
    image={{
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLB-QKWMqHVctQj_ZVrpk9RGS7N6TBsMHEIE4WeynpD9DCBpvUa7swU_HcMw7PgQARb2U&usqp=CAU',
    }}
    title="Here are some lovely texts just for testing if things go great, hopefully so"
    subtitle="Here are some lovely Subtitle texts just for testing if things go great, hopefully so"
    ctaLabel="Call To Action"
    ctaReference={headerButtonLink as Reference}
  />
);

export const Primary = Template.bind({});
