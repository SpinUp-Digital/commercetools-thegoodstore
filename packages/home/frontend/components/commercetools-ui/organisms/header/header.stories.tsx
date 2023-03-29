import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { linkReferenceOne } from 'helpers/mocks/mockCommonData';
import { logo, links, tiles } from 'helpers/mocks/mockHeaderData';
import Header from './index';
import { HeaderProps } from './types';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
} as Meta;

const Template: Story<HeaderProps> = () => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
      Page header
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-40 pr-40">
      <Header
        navLinks={links}
        logo={logo}
        categories={links}
        logoMobile={logo}
        logoLink={linkReferenceOne}
        logoLinkMobile={linkReferenceOne}
        emptyCartTitle={''}
        emptyCartSubtitle={''}
        emptyCartImage={logo}
        emptyCartCategories={[]}
        emptyWishlistTitle={''}
        emptyWishlistSubtitle={''}
        emptyWishlistImage={logo}
        emptyWishlistCategories={[]}
        tiles={tiles}
      />
    </div>
  </div>
);

export const Default = Template.bind({});
