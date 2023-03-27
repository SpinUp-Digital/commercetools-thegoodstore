import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { footerColumns, footerLogo, footerSocialMediaLinks } from 'helpers/mocks/mockFooterData';
import Footer, { Props as FooterProps } from './index';

export default {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<FooterProps> = (args) => (
  <div className="ml-44">
    <Typography fontSize={28} fontFamily="libre" medium className="mt-40 w-[40%] text-primary-black">
      Page Footer
    </Typography>
    <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
      Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
      usage and look at something cool we have made, here you will see the components and it&apos;s variants in order to
      show how much is the client capable to customize
    </Typography>
    <div className="mt-40">
      <Footer {...args} columns={footerColumns} logo={footerLogo} socialMedia={footerSocialMediaLinks} />
    </div>
  </div>
);

export const Default = Template.bind({});
