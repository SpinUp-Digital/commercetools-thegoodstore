import React from 'react';
import { Story, Meta } from '@storybook/react';
import { footerColumns, footerLogo, footerSocialMediaLinks } from 'helpers/mocks/mockFooterData';
import Footer, { Props as FooterProps } from './index';

export default {
  title: 'Components/Organisms/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<FooterProps> = (args) => (
  <Footer {...args} columns={footerColumns} logo={footerLogo} socialMedia={footerSocialMediaLinks} />
);

export const WithoutHighlights = Template.bind({});
