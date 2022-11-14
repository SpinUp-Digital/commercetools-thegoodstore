import React from 'react';
import { Story, Meta } from '@storybook/react';
import { footerColumns, footerLogo, footerSocialMediaLinks } from 'helpers/mocks/mockData';
import Footer, { Props as FooterProps } from './index';

export default {
  title: 'commercetools Frontend/Organisms/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<FooterProps> = (args) => (
  <Footer columns={footerColumns} logo={footerLogo} socialMedia={footerSocialMediaLinks} {...args} />
);

export const WithoutHighlights = Template.bind({});
